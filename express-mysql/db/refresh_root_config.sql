-- SIMPLE ROOT-USER CONFIGURATION --
ALTER USER 'root' @'localhost' IDENTIFIED BY 'root';
ALTER USER 'root' @'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;