
setTimeout(() => {
  alert("Hello Rohan");  
  }, 5000);
var idleTime = 0;
var stopTimer; // variable to handle idle timer - #01-DEC-2020
var conversationStarted = false;
nanorep.floatingWidget.on({

    userAction: function() {

        console.log("user performed some action on the bot");

        idleTime = 0;
        stopTimer = false; // Will enable the idle timer on user activity - #01-DEC-2020
        conversationStarted = true;
    },

    load: function() {

        console.log("bold widget loaded");

        this.api.conversation.setReadMoreLimit(50000);

        //var email = NOW.user_name ? NOW.user_name : "";

        //var name = NOW.user_display_name ? NOW.user_display_name : 'noEmail';

        //var encyId = NOW.user_id ? NOW.user_id : "";
    
        this.setInitializedEntities({

            //"NAME": name,

            //"EMAIL": email,

            //"ENCYID": encyId
	SNOW_USER_NAME: "rohan.vartak",
    SNOW_USER_DISPLAY_NAME: "Rohan Vartak",
    //EMAIL: "ravinder.malhotra@techmahindra.com",
    NAME: "Ravinder Malhotra",
    //ENCYID: "d67bce21db679410c6e5fba51d9619d9"

        });

        console.log("initialized entities");

        //console.log("NAME:", name, "EMAIL:", email, "encyId:", encyId);
console.log("NAME:",  SNOW_USER_DISPLAY_NAME, "EMAIL:", SNOW_USER_NAME);


        //Increment the idle time counter every minute.

        (function() {

            var idleInterval = setInterval(function() {

                idleTime += 1;

                if (idleTime == 8 && (!stopTimer) && conversationStarted && !nanorep.floatingWidget.isLiveChatActive()) { //Added condition to handle idle timer - #01-DEC-2020

                    nanorep.floatingWidget.showArticle(1591218432);

                    document.querySelector(".language-selector").disabled = "true";

                    idleTime = 0;
                    stopTimer = true; //Will disable the idle timer after the 3rd message - #01-DEC-2020

                }

            }, 60000);

        })();


        function getTranscript_text() {

            console.log("getTranscript function");

            var val = nanorep.floatingWidget.$refs.core.conversationSession.entries;

            var aChatData = [];

            for (i = 0; i < val.length; i++) {

                if (val[i].responseType != undefined) {

                    aChatData.push("BOT: " + val[i].text);

                } else if (val[i].responseType == undefined) {

                    if (val[i].text != undefined && val[i].text != "" && val[i].text != null) {

                        aChatData.push("USER: " + val[i].text);

                    }

                }

            }
			
            console.log("chatData:", aChatData);

            return aChatData.join("\n\n");

        }

       this.api.conversation.registerClientEntities({

            BOT_TRANSCRIPT: function(response) {
				//debugger;
                return {

                    "kind": "BOT_TRANSCRIPT",

                    "type": "text",

                    "value": getTranscript_text(),

                    "lifecycle": "topic"

                };

            },
            USER_LASTMSG: async function(response) {
                //debugger;
                return {
                    "kind": "USER_LASTMSG",
                    "type": "text",
                  //"value": await msg(),
                    "value":await nanorep.floatingWidget.getLastQuery(),
                    "lifecycle": "persistent"
                }
                }

        })



    }

});



(function(widgetRootNode) {



    var observer = new MutationObserver(function() {

        var activeLocale = nanorep.floatingWidget.api.i18n.getLocale();

        if (activeLocale === nanorep.floatingWidget.cnf.kbLanguageCode) {

            //  console.log("if condition")

            return;

        } else {

            var disclaimerDiv = document.querySelectorAll(".welcome_disclaimer:last-child");

            if (disclaimerDiv && disclaimerDiv.length > 1) {

                var div = disclaimerDiv[disclaimerDiv.length - 1];

                var closest = div.closest(".conversation-log__entry");

                closest.style.display = "none";

            }

            console.log(activeLocale, "else");

        }

    });

    observer.observe(widgetRootNode, {

        childList: true,

        subtree: true

    });



})(nanorep.floatingWidget.$domElement);



var interval = setInterval(function() {

    var icon = document.getElementsByClassName("shared__teaser-opener-icon");

    if (icon && icon[0]) {

        icon[0].style.backgroundImage = "url('https://cache.techmahindra.com/static/img/brandkit/logo/Logo-White.png')";

        icon[0].style.backgroundSize = "70px";

        clearInterval(interval);

    }

}, 1);  
