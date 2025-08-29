$(document).ready(function() {
    $("#authTab").click(function() {
        $("#authForm").show();
        $("#regForm").hide();
        $(this).addClass("active");
        $("#regTab").removeClass("active");
    });

    $("#regTab").click(function() {
        $("#regForm").show();
        $("#authForm").hide();
        $(this).addClass("active");
        $("#authTab").removeClass("active");
    });

    const users = [
        { email: "test@example.com", password: "password123", blocked: false }
    ];
    
    let loginAttempts = 0;
    let isBlocked = false;
    const BLOCK_TIME = 300000; // 5 минут в миллисекундах
    let blockTimeout;
    
    $("#loginBtn").click(function(e) {
        e.preventDefault();
    
        if (isBlocked) {
            alert("Вы заблокированы на 5 минут.");
            return;
        }
    
        const email = $("#authEmail").val();
        const password = $("#authPassword").val();
        const user = users.find(u => u.email === email);
    
        if (user) {
            if (user.blocked) {
                alert("Ваш аккаунт заблокирован.");
            } else if (user.password === password) {
                alert("Успешный вход!");
                window.location.href = "dashboard.html"; // Переход на страницу после успешного входа
            } else {
                loginAttempts++;
                alert("Неверный пароль.");
    
                if (loginAttempts >= 3) {
                    isBlocked = true;
                    alert("Вы заблокированы на 5 минут.");
                    blockTimeout = setTimeout(() => {
                        isBlocked = false;
                        loginAttempts = 0;
                        alert("Вы можете снова попытаться войти.");
                    }, BLOCK_TIME);
                }
            }
        } else {
            alert("Пользователь не найден.");
            loginAttempts++;
                    
            if (loginAttempts >= 3) {
                isBlocked = true;
                alert("Вы заблокированы на 5 минут.");
                blockTimeout = setTimeout(() => {
                    isBlocked = false;
                    loginAttempts = 0;
                    alert("Вы можете снова попытаться войти.");
                }, BLOCK_TIME);
            }
        }
    });
    
    $("#registerBtn").click(function(e) {
        e.preventDefault();
    
        const email = $("#regEmail").val();
        const name = $("#regName").val();
        const password = $("#regPassword").val();
    
        // Проверка на существующих пользователей
        if (users.some(u => u.email === email)) {
            alert("Пользователь с таким E-mail уже существует.");
            return;
        }
    
        // Добавление нового пользователя
        users.push({ email, password, blocked: false });
        alert("Регистрация успешна! Теперь вы можете войти.");
    });
    
    // Переключение между формами
    $("#authTab").click(function() {
        $("#authForm").addClass("active");
        $("#regForm").removeClass("active");
    });
    
    $("#regTab").click(function() {
        $("#regForm").addClass("active");
        $("#authForm").removeClass("active");
    });    
});

