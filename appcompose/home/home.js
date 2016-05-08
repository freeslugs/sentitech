(function(){
  'use strict';

  // The initialize function must be run each time a new page is loaded
  Office.initialize = function(reason){
    jQuery(document).ready(function(){
      app.initialize();

      jQuery('#set-subject').click(setSubject);
      jQuery('#get-subject').click(getSubject);
      jQuery('#add-to-recipients').click(addToRecipients);

      getSentiment();
    });
  };

  function getSentiment() {
    getBody(function(result) {
      // jQuery.get("localhost:3000").then(function(data) {
      //   console.log(data);
      // });
      jQuery.ajax({
          url: "https://localhost:3000",
       
          // The name of the callback parameter, as specified by the YQL service
          jsonp: "callback",
       
          // Tell jQuery we're expecting JSONP
          dataType: "jsonp",
       
          // Tell YQL what we want and that we want JSON
          data: {
              q: "select title,abstract,url from search.news where query=\"cat\"",
              format: "json"
          },
       
          // Work with the response
          success: function( response ) {
              console.log( response ); // server response
          }
      });
    });
  }

  function setSubject(){
    // Office.cast.item.toItemCompose(Office.context.mailbox.item).subject.setAsync('Hello world!');
    Office.context.mailbox.item.body.setAsync(
      '<a id="LPNoLP" href="http://www.contoso.com">Click here!</a>', 
      {coercionType: Office.CoercionType.Html});
  }

  function getSubject(){
    // Office.cast.item.toItemCompose(Office.context.mailbox.item).subject.getAsync(function(result){
    //   app.showNotification('The current subject is', result.value);
    // });
    
  }

  function setBody(text) {
    Office.context.mailbox.item.body.setAsync(
      text, 
      {coercionType: Office.CoercionType.Html}
    );
  }

  function getBody(callback) {
    Office.context.mailbox.item.body.getAsync(
      "text",
      { asyncContext:"This is passed to the callback" },
      callback
    );
  }

  function addToRecipients(){
    var item = Office.context.mailbox.item;
    var addressToAdd = {
      displayName: Office.context.mailbox.userProfile.displayName,
      emailAddress: Office.context.mailbox.userProfile.emailAddress
    };

    if (item.itemType === Office.MailboxEnums.ItemType.Message) {
      Office.cast.item.toMessageCompose(item).to.addAsync([addressToAdd]);
    } else if (item.itemType === Office.MailboxEnums.ItemType.Appointment) {
      Office.cast.item.toAppointmentCompose(item).requiredAttendees.addAsync([addressToAdd]);
    }
  }

})();
