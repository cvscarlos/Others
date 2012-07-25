/**
* jQuery Custom Alert
* @author Carlos Vinicius
* @version 1.0
*/
(function($){
    var b,overlay,container,wrapper,defaultOptions,options,containers,buttonWrapper;

    overlay=$('<div id="vkAlertOverlay"></div>');
    container=$('<div id="vkAlertContainer">\
        <div id="vkAlertInnerContainer">\
            <div id="vkAlertContent">\
                <div id="vkAlertWrapper"></div>\
            </div>\
            <div id="vkAlertButton">\
                <button><span><span>OK</span></span></button>\
            </div>\
        </div></div>');
    wrapper=container.find("#vkAlertWrapper");
    containers=overlay.add(container);
    buttonWrapper=container.find("#vkAlertButton");
    
    $.vkAlert=function()
    {
        b=$("body");
        w=$(window);

        var fn={
            init:function()
            {
                this.renderHtml();
            },
            renderHtml:function()
            {
                overlay.css(options.overlayCss);
                container.css(options.containerCss);
                buttonWrapper.css(options.buttonWrapperCss);
                b.append(overlay);
                b.append(container);
            },
            newAlert:function(str)
            {
                wrapper.html(fn.nl2br(str));
                containers.show();
				fn.resize();
                containers.css("visibility","visible");
            },
			nl2br:function(str)
			{
				var out;
				
				out=str.replace(/(\n|\r)/gi,"<br />").replace("\
				","<br />");
				
				return out;
			},
			resize:function(){
				var maxWidth,maxHeight,tmp;
				
				tmp=(w.height()-40);
				maxHeight=tmp<100?100:tmp;
				
				wrapper.css("float","left");
				tmp=wrapper.width();
				console.log(tmp);
				
				container.css("max-height",maxHeight);
			}
        };
        
        defaultOptions={
            overlayCss:{
                opacity:0.6,
                position:"fixed",
                left:0,
                top:0,
                width:"100%",
                height:"100%",
                background:"#FFF",
                "z-index":999999,
                display:"none",
                visibility:"hidden"
            },
            containerCss:{
                border:"1px solid rgb(92,92,92)",
                "border-radius":4,
                "box-shadow":"0 0 20px 2px rgba(92,92,92,.3)",
                padding:8,
                width:200,
                "z-index":999999,
                position:"fixed",
                left:"50%",
                "margin-left":-100,
                top:"35%",
                background:"#FFF",
                display:"none",
                visibility:"hidden"
            },
			buttonWrapperCss:{
				"margin-top":10,
				"text-align":"right"
			},
            callback:function(){} // Callback ao iniciar
        };
        
        options=$.extend(defaultOptions,$.vkAlert_options);
        
        fn.init();
        window.alert=fn.newAlert;
        options.callback();
    };
})(jQuery);
jQuery(jQuery.vkAlert);