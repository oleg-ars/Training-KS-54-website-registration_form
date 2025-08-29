<?php
session_start();

// Функция для безопасного хеширования паролей
function hashPassword($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}

// Функция для проверки паролей
function verifyPassword($enteredPassword, $storedHash) {
    return password_verify($enteredPassword, $storedHash);
}

// Пример использования
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['register'])) {
        // Регистрация пользователя
        $password = $_POST['password']; // Пароль введенный пользователем
        $hashedPassword = hashPassword($password);

        // Сохраните $hashedPassword в базе данных вместо обычного пароля
        // ...

    } elseif (isset($_POST['login'])) {
        // Вход пользователя
        $storedHash = /* получаем хеш из базы данных по email */
        $enteredPassword = $_POST['password'];

        if (verifyPassword($enteredPassword, $storedHash)) {
            // Пара успешного входа
            echo "Успешный вход!";
        } else {
            echo "Неверный пароль.";
        }
    }
}
?>
