Router.map(function() {
    this.route('portal', {
        path: '/'
    });
});

Meteor.Router.add('/twilio', function() {
	var settings = Settings.findOne({ settings: 'master' });
	var phonenumber = randomActivePhoneNumber();
	if(settings.switchboardEnabled && phonenumber){
    xmldata = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmldata += "<Response><Play>http://voice.holachek.com/Picked.wav</Play>";
    xmldata += "<Play>http://voice.holachek.com/HackMITPresents.mp3</Play>";
    xmldata += "<Play>http://voice.holachek.com/PleaseWaitAsWeConnectYou.mp3</Play>";
    xmldata += "<Dial>+1" + phonenumber + "</Dial>";
    xmldata += "</Response>";
} else {
   xmldata = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmldata += "<Response><Play>http://voice.holachek.com/Picked.wav</Play>";
    xmldata += "<Play>http://voice.holachek.com/announce.mp3</Play>";
    xmldata += "</Response>";
}
    return [200, {"Content-Type": "text/xml"}, xmldata];

});
