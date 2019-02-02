
s.boot;

(
  ~qitchBuffer = Buffer.read
  (Server.default,"/usr/share/SuperCollider/Extensions/share/SuperCollider/Extensions/SC3plugins/PitchDetection/extraqitchfiles/QspeckernN2048SR44100.wav");

/*d = Buffer.read(s, "/home/xt53/Desktop/data/negative/candido.wav");*/
d = Buffer.read(s, "/home/xt53/Desktop/data/positive/79.wav");


  {
/*	var sound = SinOsc.ar(240,mul:0.5)
	+ Resonz.ar(ClipNoise.ar,2000,0.6,mul:SinOsc.kr(0.05).range(0,0.5))
	+ Saw.ar(2000,mul:SinOsc.kr(0.1).range(0,0.3));*/

	// TODO: normalize all vals...

	var sound = PlayBuf.ar(1, d, loop: 1, rate: BufRateScale.kr(d));
	var fft = FFT(LocalBuf(2048), sound, wintype: 1);
	var trig = OnsetStatistics.kr(Onsets.kr(fft, 0.125), 2.0);
	var mfcc = MFCC.kr(fft);
	var spec = SpecCentroid.kr(fft);
	var flatness = SpecFlatness.kr(fft);
	var percentile = SpecPcile.kr(fft, 0.9, 1);
	var crest = FFTCrest.kr(fft);
	var slope = FFTSlope.kr(fft);
	var chromogram = Chromagram.kr(fft);
	var dissonance = SensoryDissonance.kr(fft);
	var zc = ZeroCrossing.ar(sound);
	var pitch = Pitch.kr(sound);
	var tartini = Tartini.kr(sound, threshold: 0.001, smallCutoff: 0.2);
	var quich = Qitch.kr(sound, ~qitchBuffer, algoflag: 1, minfreq: 0, maxfreq: 1000, ampThreshold: 0.001);
/*	var rms = RunningSum.rms(sound, 100);
	var amp = Amplitude.kr(sound);
	var peak = Peak.kr(sound, Impulse.kr(1));
	var peakf = PeakFollower.kr(sound);
	var min = RunningMin.kr(sound);
	var max = RunningMax.kr(sound);*/
	SendReply.kr(fft,'extract_features',
/*		chromogram ++  ++[zc] ++ quich ++ tartini ++  ++ [percentile] ++
		 ++ */
		mfcc
		// [dissonance]
		// [percentile]
		// [crest]
		// [dissonance] ++ [spec] ++ [slope.abs]
		// [trig]
		//[zc] ++
		// quich ++ tartini
	);
	Out.ar(0, sound!2);
  }.play;
)

// zc / 10000
// quitch / 3000
// q2
// tartini / 250
// flatness
// percentile / 3000

(
  b = NetAddr.new("127.0.0.1", 57111);
  OSCresponder(s.addr, 'extract_features', { arg time, responder, msg;
	//msg.asCompileString.postln;
	b.sendMsg('/feature', msg.asCompileString);
  }).add
);


