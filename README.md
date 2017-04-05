# Jquery Simple Slider

## How to use
Include jQuery library in your page:
````html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
````
Include the javascript file in your page:
````html
<script src="./src/slider.js"></script>
````
## Example
HTML layout

By default all images have height=auto(for responsive slider) if necessary can set fixed height
````html
<div class="slider-container">
  <div class="slider">
    <div class="slider__item">
      <img src="img-1.jpg" alt="">
      <span class="slider__caption">Lorem ipsum dolor sit amet, consectetur adipisicing elit.<a href="">Далее >></a> </span>
    </div>
    <div class="slider__item">
      <img src="img-2.jpg" alt="">
      <span class="slider__caption">2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, facilis.</span>
    </div>
    <div class="slider__item">
      <img src="img-3.jpg" alt="">
      <span class="slider__caption">3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, culpa!</span>
    </div>
  </div>
    <div class="slider__switch slider__switch--prev" data-ikslider-dir="prev">
      <span></span>
    </div>
    <div class="slider__switch slider__switch--next" data-ikslider-dir="next">
      <span></span>
    </div>
</div>
````
Init plugin
````javascript
$(".slider-container").ikSlider();
````
Init with options
````javascript
$(".slider-container").ikSlider({
	speed: 700,
	cssEase: "ease-in-out"
});
````
Show specified slide
````javascript
$(".slider-container").ikSlider(3);
````
Destroy plugin
````javascript
$(".slider-container").ikSlider('destroy');
````
## Options
available options and their default values
````javascript
touch   : true,
controls: true,
arrows  : true,
infinite: false,
delay   : 10000, // 10s
caption : false,
speed   : 300,
cssEase : 'ease-out',
responsive: true,
autoPlay: true,
pauseOnHover: true
````
## Event
ikSlider represents one event for additional functionality.

Event `slideChange.ikSlider` - event fired everytime when changing slides. Event have the following additional property `currentSlide` (index of the current slide).

````javascript
$('#slider').on('changeSlide.ikSlider', function(e) {
  // console.log(e.currentSlide) ...
});
````