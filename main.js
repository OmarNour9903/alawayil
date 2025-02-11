document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let form = event.target;
    let data = new FormData(form);
    let url = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScU3f0chIv7itkDUJBIU4c8fHCyLUS8jFMjwliAHuljmI748g/formResponse";

    fetch(url, {
        method: "POST",
        body: data,
        mode: "no-cors"
    }).then(() => {
        document.getElementById('successMessage').style.display = 'block';
        setTimeout(() => {
            location.reload();
        }, 2000);
    }).catch(() => {
        alert('حدث خطأ أثناء الإرسال. حاول مرة أخرى.');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const link = document.getElementById("trackLink");

    link.addEventListener("click", function () {
        let linkClicks = parseInt(localStorage.getItem("linkClicks")) || 0;
        linkClicks++;
        localStorage.setItem("linkClicks", linkClicks);

        alert(`عدد الضغطات على الرابط: ${linkClicks}`);
    });
    
    let totalLinkClicks = parseInt(localStorage.getItem("linkClicks")) || 0;
    console.log(`العدد الكلي للضغطات على الرابط: ${totalLinkClicks}`);
});