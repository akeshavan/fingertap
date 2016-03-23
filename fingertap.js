Taps = new Mongo.Collection(null);


if (Meteor.isClient) {

  var previous_time = 0
  var start_time = 0
  var clicknum = 0
  var data = []
  
  Template.hello.greeting = function () {
    return Taps.find({}).count()
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
