(function(){
  'use strict';

  // The initialize function must be run each time a new page is loaded
  Office.initialize = function(reason){
    jQuery(document).ready(function(){
      app.initialize();

      jQuery('#set-subject').click(setSubject);
      jQuery('#get-subject').click(getSubject);
      jQuery('#add-to-recipients').click(addToRecipients);

      getSentiment(function(score) {
        var percent = Math.round(score*10000)/100 + "%";
        jQuery("#sentiment").text(percent);
      });
    });
  };

  function sentimentize(sentiment) {
    getBody(function(result) {
      var body = result.value;
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sentitech-api.herokuapp.com/api/sentimentize",
        "method": "POST",
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
          "cache-control": "no-cache"
        },
        "data": {
          "text": body,
          "sentiment": sentiment
        }
      }

      jQuery.ajax(settings).done(function (response) {
        console.log(response);
      });
    });
  }

  function getSentiment(callback) {
    getBody(function(result) {
      var body = result.value;
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sentitech-api.herokuapp.com/api/getsentiment",
        "method": "POST",
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
          "cache-control": "no-cache"
        },
        "data": {
          "text": body 
        }
      }

      jQuery.ajax(settings).done(function (response) {
        if(callback) {
          callback(response);  
        }
      });
    });
  }

  function setSubject(){
    // Office.cast.item.toItemCompose(Office.context.mailbox.item).subject.setAsync('Hello world!');
    // Office.context.mailbox.item.body.setAsync(
    //   '<a id="LPNoLP" href="http://www.contoso.com">Click here!</a>', 
    //   {coercionType: Office.CoercionType.Html});
  }

  function getSubject(){
    // Office.cast.item.toItemCompose(Office.context.mailbox.item).subject.getAsync(function(result){
    //   app.showNotification('The current subject is', result.value);
    // });
    sentimentize(sentiment);
    // getSentiment(function(score) {
    //   var percent = Math.round(score*100)/100 + "%";
    //   jQuery("#sentiment").text(percent);
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
