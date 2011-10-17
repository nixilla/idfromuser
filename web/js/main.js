$(document).ready(function()
{
  $('#twitter').submit(function()
  {
    if($('input[name="username"]').val() != '')
    {
      
      $('input[type="submit"]').attr('disabled',true);
      $('article').empty();
      $('article').append('<div class="loader"><img src="images/loader.gif" alt="Loading" /></div>');
    
      $.ajax({
        url: "https://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + jQuery.trim($('input[name="username"]').val()) + "&count=1&callback=?",
        dataType: 'json',
        success: function(data)
        { 
          $('article').empty();
          if(data && data[0])
          {
            $('article').append('<div class="image"><img src="'+data[0].user.profile_image_url+'" alt="'+data[0].user.screen_name+'" /></div>');
            $('article').append('<div class="profile"><h1>'
              +data[0].user.name
              +'</h1><p class="screen-name">@'
              +data[0].user.screen_name
              +' <span>'
              +data[0].user.location
              +'</span></p><p class="rss-feed"><a href="http://twitter.com/statuses/user_timeline/'
              +data[0].user.id
              +'.rss" target="_blank"><img src="/images/rss-icon-16x16.png" alt="rss" />http://twitter.com/statuses/user_timeline/'
              +data[0].user.id
              +'.rss</a></p><p class="id"><span>'
              +data[0].user.id
              +'</span></p></div>');

            $('body').css('background-color','#'+data[0].user.profile_background_color);
            $('body').css('background-image','url('+data[0].user.profile_background_image_url+')');
            _gaq.push(['_trackEvent', 'twitter', 'getId', 'Success']);
          }
          else
          {
            $('article').append('<p class="error">Success but Twitter returned empty result</p>');
            _gaq.push(['_trackEvent', 'twitter', 'getId', 'SuccessButEmpty']);
          }
            
          
          $('input[type="submit"]').removeAttr('disabled');
        },
        error: function(xhr, ajaxOptions, thrownError)
        {
          _gaq.push(['_trackEvent', 'twitter', 'getId', 'Error']);
          
          $('article').empty();

          if(xhr.status == 200)
            $('article').append('<p class="error">Error: Twitter returned empty result</p>');
          else
            $('article').append('<p class="error">Error: '+xhr.statusText+'</p>');
          
          $('input[type="submit"]').removeAttr('disabled');
        }
      });
    }
    else $('input[type="submit"]').removeAttr('disabled');
    
    return false;
  });
  
});