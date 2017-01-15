    var listArray = ["track1", "track2" , "track3" , "track4"];
    var songArray = ["theowl.mp3" , "songs/aglowhollow.mp3" , "songs/playTimes.mp3" , "songs/notawitness.mp3"];
    $ ('#disc').hide();
    function Jukebox(audioId){
        document.getElementById('adding').setAttribute('src' , audioId);
        var track = document.getElementById('adding');
        this.play = function(){
            document.getElementById('play').addEventListener("click" , function(){
                track.play();
                $ ('#disc').show();
                document.body.style.backgroundImage = "url('http://www.dansschoolrobdolderman.nl/index_htm_files/dansen-5788.gif')";

            })
        }
        this.pause = function(){
            document.getElementById('pause').addEventListener("click" , function(){
                track.pause();
                $ ('#disc').hide();
                document.body.style.backgroundImage = "url('http://hdwall.us/wallpaper/guitars_abstract_pattern_music_black_background_desktop_1280x1024_hd-wallpaper-14780.jpg')"
            })
        }
        this.stop = function(){
            document.getElementById('stop').addEventListener("click" , function(){
                track.pause();
                track.currentTime = 0;
                $ ('#disc').hide();
                document.body.style.backgroundImage = "url('http://hdwall.us/wallpaper/guitars_abstract_pattern_music_black_background_desktop_1280x1024_hd-wallpaper-14780.jpg')"

            })
        }
    }


    document.querySelector('form').addEventListener('submit' , function(e){
        e.preventDefault();
        var trackUser = document.querySelector('input').value;

        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: trackUser,
                type: "track"
            },
            success: function (response) {
                if(response.tracks.items[0].preview_url != undefined){
                  $ ('ul').append("<li> "+ "Playing " + trackUser +  "</li>");
                  $('ul li').contents().wrap('<a href="#"></a>');
                  document.getElementsByTagName('li')[listArray.length].setAttribute('id', listArray.length + "track");
                  songArray.push(response.tracks.items[0].preview_url);
                  listArray.push(songArray.length + "track");
                  $ ('li').click(function() {
                    var itemIndex =  $ (this).index();
                    document.getElementById('headline').innerText = document.getElementsByTagName('li')[itemIndex].innerText;
                    myBox1 = new Jukebox(songArray[itemIndex]);
                    myBox1.play();
                    myBox1.pause();
                    myBox1.stop();
                })
              }
          }


      });

    })

    $ ('li').click(function() {
        var itemIndex =  $ (this).index();
        document.getElementById('headline').innerText = document.getElementsByTagName('li')[itemIndex].innerText;
        var myBox1 = new Jukebox(songArray[itemIndex]);
        myBox1.play();
        myBox1.pause();
        myBox1.stop();
    })
