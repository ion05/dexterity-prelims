const [
    user1,
    user2,
    user3,
    user4
] = [
    document.querySelector('.user-1'),
    document.querySelector('.user-2'),
    document.querySelector('.user-3'),
    document.querySelector('.user-4')
]
user1.addEventListener('click',()=>{
    console.log('object')
})
user2.addEventListener('click',()=>{
    console.log('object')
})

user3.addEventListener('click',()=>{
    console.log('object')
})
user4.addEventListener('click',()=>{
    console.log('object')
})
var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});