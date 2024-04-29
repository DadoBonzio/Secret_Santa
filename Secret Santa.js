window.onload = initPeopleList;

function initPeopleList() {
    for (var i = 0; i < 4; i++)
        addElementToPeopleList();
}

function addElementToPeopleList() {
    var list = document.getElementById("peopleList");
    var li = document.createElement("li");
    var emailField = document.createElement("input");
    emailField.type = "text";
    emailField.title = "email";
    emailField.placeholder = "email";
    li.appendChild(emailField);
    var nicknameField = document.createElement("input");
    nicknameField.type = "text";
    nicknameField.title = "nickname";
    nicknameField.placeholder = "nickname";
    li.appendChild(nicknameField);
    list.appendChild(li);
}

function removeElementFromPeopleList() {
    var list = document.getElementById("peopleList");
    if (list.childElementCount > 2)
        list.removeChild(list.lastChild);
}

function sendEmails() {
    var peopleList = document.getElementById("peopleList");
    var people = [];
    for (var i = 0; i < peopleList.childElementCount; i++) {
        var email = peopleList.children[i].children[0].value;
        var nickname = peopleList.children[i].children[1].value;
        people.push({
            email: email,
            nickname: nickname
        });
    }

    for (let i = 0; i < new Date().getSeconds(); i++)
        people.sort(() => Math.random() - .5);

    console.log(people);

    var temp = people[0].nickname;
    for (let i = 0; i < people.length - 1; i++) {
        people[i].nickname = people[i + 1].nickname;
    }
    people[people.length - 1].nickname = temp;

    console.log(people);
    //send mails

    const serviceID = "service_n05ddqf";
    const templateID = "template_e33dzag";
    for (let i = 0; i < people.length; i++) {
        var params = {
            name: people[i].nickname,
            email: people[i].email
        }


        emailjs.send(serviceID, templateID, params).catch(err => console.log(err))
    }
    window.alert("Success!");
}

