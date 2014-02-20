Agents = new Meteor.Collection('agents');
Settings = new Meteor.Collection('settings');

if (Meteor.isClient) {
    // Template.hello.greeting = function () {
    //   return "Welcome to bluephone.";
    // };

    Template.portal.rendered = function() {
        $("#phone").mask("?999.999.9999");

        var settingsmaster = Settings.findOne({ settings: 'master' });
        
    }

    Template.portal.helpers({
        totalCalls: function() {
            var calls = 0;
            var total = "NaN";
            return total;
        },
        agent: function() {
            return Agents.find();
        },
        portalState: function() {
            if (Settings.findOne({
                switchboardEnabled: true
            })) {
                return "ACTIVE";
            } else {
                return "DISABLED"
            }
        },
        portalColor: function() {
            if (Settings.findOne({
                switchboardEnabled: true
            })) {
                return "label-danger";
            } else {
                return "label-default";
            }
        }
    });

    Template.agentLine.helpers({
        renderChecked: function() {
            if (this.enabled) {
                return 'checked';
            }
        }
    });

    Template.portal.events({
        'submit form': function(e) {
            e.preventDefault();

            var nameVal = $('#name').val();
            var phoneVal = $('#phone').val()

            if (nameVal.length < 1) {
                return;
            }

            if (phoneVal.length < 12) {
                return;
            }

            Agents.insert({
                name: nameVal,
                phone: phoneVal,
                enabled: true,
                calls: 0
            });

            $('#name').val("");
            $('#phone').val("");
        },
        'click input[type=checkbox]': function(e) {
            var id = e.target.id;
            var checkState = e.srcElement.checked;
            Agents.update({
                _id: id
            }, {
                $set: {
                    enabled: checkState
                }
            });

            if (!Agents.findOne({
                    enabled: true
                })) {

                $('a#toggleActive').click();

            }

            // console.log(Agents.findOne({ _id: id }));

        },

        'click a#resetStats': function(){

            Meteor.call('resetStats');

        },

        'click a[name=delete]': function(e) {
            var id = e.target.id;
            Agents.remove({
                _id: id
            });

        },
        'click a#toggleActive': function() {
            var currentStatus = Settings.findOne({
                settings: "master"
            });

            var newState = !currentStatus.switchboardEnabled

            if (newState) {
                if (Agents.findOne({
                    enabled: true
                })) {
                    Settings.update({
                        _id: currentStatus._id
                    }, {
                        $set: {
                            switchboardEnabled: newState
                        }
                    });

                    var tone = new buzz.sound('Connected.mp3');
                    tone.play();

                }
            } else {
                Settings.update({
                        _id: currentStatus._id
                    }, {
                        $set: {
                            switchboardEnabled: newState
                        }
                    });
                var tone = new buzz.sound('Disconnected.mp3');
                tone.play();
            }

        }
    });


}


if (Meteor.isServer) {

    activePhoneNumbers = function() {
        var possibleCallers = Agents.findOne({
            enabled: true
        }, { sort: {calls: 1}});

        return possibleCallers.phone.replace(/\D/g, '');
        // var callers = possibleCallers;
        // if (caller){
        // var newCallCount = caller.calls + 1;
        // Agents.update({
        //     _id: caller._id
        // }, {
        //     $set: {
        //         calls: newCallCount
        //     }
        // });
        // return caller.phone.replace(/\D/g, '');
    // } else {
    //     return false;
    // }
    };

    Meteor.startup(function() {

        if (Settings.find().count() != 0) {
            Settings.remove({});
        }

        Settings.insert({
            settings: "master",
            switchboardEnabled: false
        });

        if (Agents.find().count() === 0) {
            Agents.insert({
                name: 'Michael Holachek',
                phone: '703.400.7339',
                enabled: true,
                calls: 0
            });
            Agents.insert({
                name: 'Nalini Singh',
                phone: '571.344.4592',
                enabled: true,
                calls: 0
            });
        }
    });
}
