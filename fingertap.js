Taps = new Mongo.Collection(null);
Scoreboard = new Mongo.Collection("scoreboard")

if (Meteor.isClient) {

  var previous_time = 0
  var start_time = 0
  var clicknum = 0
  var data = []
  
  //Template.hello.greeting = function () {
  //  return Taps.find({}).count()
  //};

  Template.hello.helpers({scores: function(){return Scoreboard},
                          greeting: function(){return Taps.find({}).count()},
                          tableSettings : function() {
                              return {
                                  collection: Scoreboard.find(),
                                  fields: [
                                    { key: 'id', label: 'ID' },
                                    { key: 'score', label: 'Score', sortOrder: 0, sortDirection: 'descending' },
                                    {key: "hand", label: "hand"}
                                  ]
                              }} 
                          });

Template.hello.scores = function () {
    return Scoreboard
  };

  Template.hello.events({
    'click #placeholder': function () {
      // template data, if any, is available in 'this'
      
      if (clicknum==0){
          previous_time = Date.now()
          start_time = previous_time
          console.log("first click")
      }
      var nowtime = Date.now()
      console.log(nowtime - start_time)

      if (clicknum !=0 && (nowtime-start_time)<10000){
    
         data.push([clicknum, nowtime-previous_time])
         Taps.insert({"time":nowtime-start_time, "spacing": nowtime-previous_time, "tapnum": clicknum})
         $.plot("#placeholder", [data])
         
         }
    
    clicknum = clicknum + 1
    previous_time = nowtime   
    
      
    },
    
    'click #reset': function() {
        
      previous_time = 0
      start_time = 0
      clicknum = 0
      data = []
      $.plot("#placeholder", [data])
      Taps.remove({})
        
    },
    
    "click #submit": function(){
        form_values = $("#scoreboard").serializeArray()
        var count = Taps.find({}).count()
        console.log(form_values)
        console.log(count)
        Scoreboard.insert({"score": count, "id":form_values[0]["value"], "hand": form_values[1]["value"]})
    }
    });//end events

  
  //$.plot("#placeholder", [ data])

  $("#placeholder").on("click", function(){

  console.log("clicked")
  if (click_num==0){
      previous_time = Date.now()
      start_time = previous_time
  }

  var nowtime = Date.now()
  if (click_num !=0 && (start_time-previous_time)<10000){

     data.push([clicknum, nowtime-start_previous_time])
     $.plot("#placeholder", [data])
     clicknum = clicknum + 1
     previous_time = nowtime   
     }

 
   }); //end onclick


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
