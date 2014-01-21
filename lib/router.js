Router.map(function(){
	this.route('portal', {
		path: '/'
	});
	this.route('twilio', {
		path: '/twilio',

		// waitOn: function(){
		// 	return Agents.find();
		// },

		before: function(){
			var xml = '<Response><Say voice="man">Please speak your question after the tone. You may hang up when you\'re finished</Say><Record maxLength="180" transcribe="true" transcribeCallback="https://feedvenue.com/api/twiml/transcribe" /></Response>';
    		return [200, {"Content-Type": "text/xml"}, xml];
		}
	});
})