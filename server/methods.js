Meteor.methods({

        resetStats: function() {

            Agents.update({
                enabled: true
            }, {
                $set: {
                    calls: 0
                }
            });

        }

});
