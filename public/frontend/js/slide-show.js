var slideIndex = 0;
showSlides();

function showSlides(currentIndex=null)
{
	var i;
	var slides = document.getElementsByClassName("mySlides");
	for (i = 0; i < slides.length; i++)
	{
		slides[i].style.display = "none";
	}
	slideIndex++;
	if (slideIndex > slides.length) 
	{
		slideIndex = 1;
	}

	if(currentIndex !=null)
	{
		slideIndex=currentIndex+1;
		slides[slideIndex-1].style.display = "block";
		setTimeout(showSlides, 2000);
	}
	else
	{
		slides[slideIndex - 1].style.display = "block";
		setTimeout(showSlides, 2000);
	}
}

