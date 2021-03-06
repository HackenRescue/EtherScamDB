function hideEverything() {
    $("#verified").hide();
    $("#blocked").hide();
    $("#neutral").hide();
    $("#helpmessage").hide();
}


window.addEventListener("load", function() {
    $('.ui.button').click(function() {
        $.getJSON("/api/check/" + encodeURIComponent($("input").val()), function(result) {
            if (result.result == 'verified') {
                hideEverything();
                $("#verifiedmessage").html(encodeURI($("input").val()) + ' is a verified domain. You can trust the contents.');
                $("#verifiedmessage").html($("#verifiedmessage").html());
                $("#verified").css('display', 'flex');
            } else if (result.result == 'neutral') {
                hideEverything();
                $("#neutralmessage").html(encodeURI($("input").val()) + ' wasn\'t recognized as a malicious domain, nor as verified domain. Be careful!');
                $("#neutralmessage").html($("#neutralmessage").html());
                $("#neutral").css('display', 'flex');
            } else if (result.result == 'blocked') {
                hideEverything();
                blocked = true;
                var strLink = '';
                if (result.type == 'domain' && 'category' in result.entries[0]) {
                    $("#blacklistmessage").html(encodeURI($("input").val()) + ' was put on the blacklist for ' + result.entries[0].category.toLowerCase() + '.');
                    strLink = '<a id="details" href="/scam/' + result.entries[0].id + '">Details <i class="chevron right small icon"></i></a>';
                } else if(result.type == 'address') {
					          $("#blacklistmessage").html(encodeURI($("input").val()) + ' was put on the blacklist and is associated with '+ result.entries.length +' blocked domain(s)');
					          strLink = '<a id="details" href="/address/' + result.input + '">Details <i class="chevron right small icon"></i></a>';
				        } else if(result.type == 'ip') {
					          $("#blacklistmessage").html(encodeURI($("input").val()) + ' was put on the blacklist and is associated with '+ result.entries.length +' blocked domain(s)');
					          strLink = '<a id="details" href="/ip/' + result.input + '">Details <i class="chevron right small icon"></i></a>';
				        }
                $("#blacklistmessage").html($("#blacklistmessage").html() + ' ' + strLink);
                $("#blocked").css('display', 'flex');
            }
			$(".content").each(function() {
				$(this).html($(this).html().replace('<p><b>Read more about the MyCrypto/MyEtherWallet situation here: <a href="https://medium.com/@MyCrypto/mycrypto-what-you-need-to-know-ee6e45c24313">"A Whole MEW World"</a></b></p>',''));
			});
			if($("input").val().indexOf("mycrypto.com" > -1) || $("input").val().indexOf("myetherwallet.com" > -1)) {
				$(".content").append('<p><b>Read more about the MyCrypto/MyEtherWallet situation here: <a href="https://medium.com/@MyCrypto/mycrypto-what-you-need-to-know-ee6e45c24313">"A Whole MEW World"</a></b></p>');
			}
        });
    });
});
