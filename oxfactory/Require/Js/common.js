function loadPage(__url__, param, successHandler, errorHandler, async) {
   var __param__ = null != param && param.length > 0 ? param : "dummy";
   var __async__ = null != async ? async : true;
   var __successHandler__ = null != successHandler ? successHandler : function(val) {};
   var __errorHandler__ = null != errorHandler ? errorHandler : function(err) { alert("error : " + err.status); };

   var __retVal__ = $.ajax({
      type     : "POST",
      url      : __url__,
      //dataType : "html",
      cache    : false,
      async    : __async__,
      data     : __param__,
      error    : __errorHandler__,
      success  : __successHandler__
   }).responseText;

   if( __async__ ) {
      return "";
   } else {
      return __retVal__;
   }
}

function submitPage(__url__, param, pageOption) {
   return getPage(__url__, param, pageOption);
}
function getPage(__url__, param, pageOption) {
   var __param__ = null == param || "" == param ? "dummy" : param;
   var __errorHandler__ = function(err) { alert("error : " + err.status); };

   var __retVal__ = null;
   
   var __pageOption__ = {
      type     : "POST",
      url      : __url__,
      //dataType : "html",
      cache    : false,
      async    : false,
      data     : __param__,
      error    : __errorHandler__,
      success  : function(repVal) { __retVal__ = repVal; }
   };
   
   if( null != pageOption ) {
      __pageOption__ = pageOption;
      
      __pageOption__.url = __url__;
      __pageOption__.data = __param__;
      if( null == __pageOption__.type ) __pageOption__.type = "POST";
      if( null == __pageOption__.cache ) __pageOption__.cache = false;
      if( null == __pageOption__.async ) __pageOption__.async = false;
      if( null == __pageOption__.error ) __pageOption__.error = __errorHandler__;
      __pageOption__.success = function(repVal) { __retVal__ = repVal; }
   }

   $.ajax(__pageOption__);

   return __retVal__;
}
function submitForm(__form_id__, __response_function__) {

   var __retVal__ = "";
   var __successHandler__ = null != __response_function__ ? __response_function__ : function(repVal) { __retVal__ = repVal; };

   var __options__ = { 
      //beforeSubmit:  showRequest,  // pre-submit callback 
      success:       __successHandler__,  // post-submit callback 
      async:         true,
      timeout:       300000 
 
      // other available options: 
      //url:       url         // override for form's 'action' attribute 
      //type:      type        // 'get' or 'post', override for form's 'method' attribute 
      //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
      //clearForm: true        // clear all form fields after successful submit 
      //resetForm: true        // reset the form after successful submit 
 
      // $.ajax options can be used here too, for example: 
      //timeout:   3000 
   }; 
 
   // bind form using 'ajaxForm' 
   $("#" + __form_id__).ajaxForm(__options__); 
   $("#" + __form_id__).submit();

//   $("#" + __form_id__).submit(function () {
//      $(this).ajaxSubmit(__options__); 
//      return false;
//   });

   return __retVal__;
}