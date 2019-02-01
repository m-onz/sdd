
s.boot;

(
  ~qitchBuffer = Buffer.read
  (Server.default,"/usr/share/SuperCollider/Extensions/share/SuperCollider/Extensions/SC3plugins/PitchDetection/extraqitchfiles/QspeckernN2048SR44100.wav");

  // d = Buffer.read(s, "/home/xt53/Desktop/data/negative/candido.wav");
  d = Buffer.read(s, "/home/xt53/Desktop/data/positive/hover.wav");

  {
	/*var sound = SinOsc.ar(240,mul:0.5)
	+ Resonz.ar(ClipNoise.ar,2000,0.6,mul:SinOsc.kr(0.05).range(0,0.5))
	+ Saw.ar(2000,mul:SinOsc.kr(0.1).range(0,0.3));*/
	var sound = PlayBuf.ar(1, d, loop: 1, rate: BufRateScale.kr(d));
	var fft = FFT(LocalBuf(2048), sound, wintype: 1);
	var mfcc = MFCC.kr(fft);
	var spec = SpecCentroid.kr(fft);
	var flatness = SpecFlatness.kr(fft);
	var percentile = SpecPcile.kr(fft, 0.8);
	var crest = FFTCrest.kr(fft, 1800, 2200);
	var slope = FFTSlope.kr(fft);
	var chromogram = Chromagram.kr(fft);
	var dissonance = SensoryDissonance.kr(fft);
	var zc = ZeroCrossing.ar(sound);
	var pitch = Pitch.kr(sound);
	var tartini = Tartini.kr(sound);
	var quich = Qitch.kr(sound, ~qitchBuffer);
	var rms = RunningSum.rms(sound, 100);
	var amp = Amplitude.kr(sound);
	var peak = Peak.kr(sound, Impulse.kr(1));
	var peakf = PeakFollower.kr(sound);
	var min = RunningMin.kr(sound);
	var max = RunningMax.kr(sound);
	SendReply.kr(fft,'extract_features',
		[rms] ++ [amp] ++ [peak] ++ [peakf] ++ [min] ++ [max] ++
		[zc] ++ quich ++ tartini ++ [flatness] ++ [percentile] ++
		[dissonance] ++ [spec] ++ [slope] ++ chromogram ++ mfcc
	);
	Out.ar(0, sound!2);
  }.play;
)

(
  b = NetAddr.new("127.0.0.1", 57111);
  OSCresponder(s.addr, 'extract_features', { arg time, responder, msg;
	b.sendMsg('/feature', msg.asCompileString);
  }).add
);


