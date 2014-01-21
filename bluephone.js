Agents = new Meteor.Collection('agents');

if (Meteor.isClient) {
    // Template.hello.greeting = function () {
    //   return "Welcome to bluephone.";
    // };

    // $("#phone").mask("999.999.9999");

    Template.portal.helpers({
        agent: function() {
            return Agents.find();
        }
    });

    Template.agentLine.helpers({
       renderChecked: function() {
          if (this.enabled) {
            console.log('enabled');
            return 'checked';
          }
        }
    });

    Template.portal.events({
        'submit form': function(e) {
            e.preventDefault();

            Agents.insert({
                name: $('#name').val(),
                phone: $('#phone').val(),
                enabled: true,
                calls: 0
            });
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
            
            // console.log(Agents.findOne({ _id: id }));

        }

    });

}

if (Meteor.isServer) {
    Meteor.startup(function() {
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
