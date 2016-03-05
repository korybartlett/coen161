Recycle Bots Inc COEN 161 Final Project
Fred Feyzi, Nick Rinaldi, Kory Bartlett

In this Readme, we will discuss how to operate the website, what went into each section, and what extra features we implemented that we believe could be considered as extra credit. 

All three of us worked together to make this happen, but we all did pick something more specific to work on (based on what we were better at and more interested in)

Fred: Main focus of project: Front-end Developing and UX Design 
Nick:
Kory:


1) Begin at the start_page.html file. There you will see our home page
	a) The four tabs under the welcome is basically our navigation bar. 
		i) Sign Up takes you to the member_registration.html page
		ii) Shop takes you to the shop.html page
		iii) Forum takes you to the forum.html page
		iv) Quiz takes you to the quiz.html page
	b) Also within our home page you see the “Learn more about the mission button”
		i) A modal opens and this is where the content is located.
	c) Work we’d like to be noted for potential extra credit
		1) We used a video background.
			a)It is harder than it looks and a lot of thought went into it. Compression thoughts: One thing we took note of carefully is how to include a video that would be able to play without buffering and turning very static. Filesize = bitrate x duration. So for example if you have a 30mbps connection, the video can’t require more than 30,000kbps per second to download. In our case our file size was a nice small size to work with. 
			b) Homepage.js. This is a javascript file that helps resize the video to correlate to the window the user is working on. All that extra js can be seen through that file. 
			c) The Modal and modal animation. The modal was not something we learned how to do in class. In addition to that, we used some animation to make that happen. The startsyles.css file clearly shows that through the -webkit-transition properties that were used. 

2) The Member Registration Page
	a) There is a form that can be submitted to become a member. 
		i) After all data is inputted correctly, a user code is made via an alert function
	b)Header and Footer
		i) Contains name of the page, the logo in the left hand corner, and the date in the right. 
		ii) For the footer, there is the necessary information at the bottom. 
		iii) The header and the footer are animated as can be seen. 

3) The Shop Page
	a) The catalog
		i) All products are placed here.
		ii) There is an animation hover over each product.
	b) The Guest Info Modal
		i) Again, the modal consists of animation features
		ii) This is the area where guests can check out or members can input their code for a discount.
	c)Header and Footer
		i) Contains name of the page, the logo in the left hand corner, and the date in the right. 
		ii) For the footer, there is the necessary information at the bottom. 
		iii) The header and the footer are animated as can be seen. 
	d) Work we’d like to be noted for potential extra credit
		i) Use of the modal meant using more animation features and a unique UX for the user

4) The Forum Page
	

5) The Quiz Page
	a)Quiz Section
		i) Animation is important to note. 
	b)Header and Footer
		i) Contains name of the page, the logo in the left hand corner, and the date in the right. 
		ii) For the footer, there is the necessary information at the bottom. 
		iii) The header and the footer are animated as can be seen. 
	c) Work we’d like to be noted for potential extra credit
		i) The first deliverable said that we only need to do one animation. We did two. The header/footer and the quiz content.
		
