Agents = new Meteor.Collection('agents');

if (Meteor.isClient) {
    // Template.hello.greeting = function () {
    //   return "Welcome to bluephone.";
    // };
    Template.portal.rendered = function(){
        $("#phone").mask("?999.999.9999");
    }

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

            var nameVal = $('#name').val();
            var phoneVal = $('#phone').val()

            if (nameVal.length < 1){
                return;
            }

            if (phoneVal.length < 12){
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
            
            // console.log(Agents.findOne({ _id: id }));

        },

        'click a[name=delete]': function(e) {
            var id = e.target.id;
            Agents.remove({
                _id: id
            });
            
        }

    });

}

if (Meteor.isServer) {
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
}
