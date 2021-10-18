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
  document.querySelector('.user-reviews').innerHTML=`
  <h2>
  Awesome Job
</h2>
<div class="line-user"></div>
<h3>User</h3>
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing <br>
  elit. Nam quis sed recusandae, alias facere sapiente <br>
  iusto modi eaque officia nobis obcaecati minima! <br>
  <br><br>
  Dolorem illum nisi hic. Amet odit facilis a.
</p>`;
})
user2.addEventListener('click',()=>{
  document.querySelector('.user-reviews').innerHTML=`
  <h2>
  Great Work
</h2>
<div class="line-user"></div>
<h3>User</h3>
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing <br>
  elit. Nam quis sed recusandae, alias facere sapiente <br>
  iusto modi eaque officia nobis obcaecati minima! <br>
  <br><br>
  Dolorem illum nisi hic. Amet odit facilis a.
</p>
  `
})
user3.addEventListener('click',()=>{
  document.querySelector('.user-reviews').innerHTML = `
  <h2>
  Superb
</h2>
<div class="line-user"></div>
<h3>User</h3>
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing <br>
  elit. Nam quis sed recusandae, alias facere sapiente <br>
  iusto modi eaque officia nobis obcaecati minima! <br>
  <br><br>
  Dolorem illum nisi hic. Amet odit facilis a.
</p>
  `
})
user4.addEventListener('click',()=>{
  document.querySelector('.user-reviews').innerHTML = `
  <h2>
 Great work
</h2>
<div class="line-user"></div>
<h3>User</h3>
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing <br>
  elit. Nam quis sed recusandae, alias facere sapiente <br>
  iusto modi eaque officia nobis obcaecati minima! <br>
  <br><br>
  Dolorem illum nisi hic. Amet odit facilis a.
</p>`
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