const starContainer = document.getElementsByClassName("stars")[0];
const stars = starContainer.querySelectorAll(".star");
// let width = starContainer.getBoundingClientRect().width;
// let height = starContainer.getBoundingClientRect().height;
// let x = starContainer.getBoundingClientRect().left;
// let y = starContainer.getBoundingClientRect().top;
// let right = starContainer.getBoundingClientRect().right;
// let bottom = starContainer.getBoundingClientRect().bottom;

let starsBorder = [];
stars.forEach((star) => {
    starsBorder.push(star.getBoundingClientRect()); // push the border within which each star exists , further to check which star to color we would need the border to check if "x","width","y"  is within border 
});

stars.forEach((star)=>{
    star.addEventListener("mousedown",starFunction)
})

function starFunction(e) {
    let length = stars.length;
    let startIndex = getStarIndex(e.clientX);
    console.log(startIndex);
    if (startIndex < 0)  //if less than 0 then we have touched outside the container so dont add any color
    {
        stars.forEach((star) => {
            star.style.setProperty("--star-rate", "0");
        })
    }
    else if (startIndex < length) //if its less than length , then we have touched some star , so we have touched 4th star we have to make all the star from 0 to 4 as yellow so running a loop
    {
        for (let i = 0; i < startIndex; i++) {
            stars[i].style.setProperty("--star-rate", "100");
        }

        let starPercentage =
            ((e.clientX - starsBorder[startIndex].left) * 100) /
            starsBorder[startIndex].width;  //e.clientX gives the pixel(from x-axis) where we emitted a mousedown on document , basically gives exact co-ordinate of where we clickd
        if (starPercentage < 100) {
            starPercentage = starPercentage > 0 ? starPercentage : 0;

        } else {
            starPercentage = 100;

        }

        stars[startIndex].style.setProperty("--star-rate", `${starPercentage}`);

        for (let i = stars.length - 1; i > startIndex; i--) {
            stars[i].style.setProperty("--star-rate", "0");
        }
    } else {
        stars.forEach((star) => {
            star.style.setProperty("--star-rate", "100");
        });
    }
}
    function getStarIndex(mousePosition) {
        let index = -1;
        let length = starsBorder.length;
        for (let i = 0; i < length; i++) {
            let starRect = starsBorder[i];
            if (mousePosition < starRect.left) return index;
            index++;
            if (mousePosition < starRect.right) return index; //within the specified border
        }
    }