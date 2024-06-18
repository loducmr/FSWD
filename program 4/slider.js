var stopSlideshow = false;

        function slideshow(caller) {
            var status = $(caller).attr('value');

            if (status.indexOf('Start') > -1) {
                stopSlideshow = false;
                $(caller).attr('value', 'Stop Slideshow');
                $(caller).addClass('btn-danger').removeClass('btn-success');
            } else {
                stopSlideshow = true;
                $(caller).attr('value', 'Start Slideshow');
                $(caller).addClass('btn-success').removeClass('btn-danger');
            }

            var interval = setInterval(function () {
                if (!stopSlideshow)
                    changeSlide('next');
                else
                    clearInterval(interval);
            }, 2000);
        }

        function changeSlide(direction) {
            var currentImg = $('.active');
            var nextImg = currentImg.next();
            var previousImg = currentImg.prev();

            if (direction == 'next') {
                if (nextImg.length)
                    nextImg.addClass('active');
                else
                    $('.slider img').first().addClass('active');
            } else {
                if (previousImg.length)
                    previousImg.addClass('active');
                else
                    $('.slider img').last().addClass('active');
            }

            currentImg.removeClass('active');
        }