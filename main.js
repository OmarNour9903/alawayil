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

document.getElementById('phone').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

document.getElementById('name').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^a-zA-Zأ-ي\s]/g, '');
});

document.getElementById('university').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^a-zA-Zأ-ي\s\-\/\\]/g, '');
});

document.getElementById('subject').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^a-zA-Zأ-ي\s]/g, '');
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
document.getElementById("uploadForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    let fileInput = document.getElementById("file");
    if (fileInput.files.length === 0) {
        alert("يرجى اختيار ملف.");
        return;
    }
    
    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    let response = await fetch("https://docs.google.com/spreadsheets/d/1tZrcl65xAe5xndrH_YyaVhd9ozr-kLdlf45tnaAoz6o/edit?gid=41449331#gid=41449331", { method: "POST", body: formData });

    let result = await response.json();
    if (result.status === "success") {
        document.getElementById("successMessage").style.display = "block";
        alert("تم الرفع بنجاح! رابط الملف: " + result.link);
    } else {
        alert("حدث خطأ: " + result.message);
    }
});