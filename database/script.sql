CREATE TABLE Usuarios (
    IdCliente INT PRIMARY KEY,
    user VARCHAR(50),
    name VARCHAR(50),
    rol VARCHAR(50),
    pass VARCHAR(100)
);

CREATE TABLE Roles (
    IdRol INT PRIMARY KEY,
    IdCliente INT,
    RolName VARCHAR(50),
    FOREIGN KEY (IdCliente) REFERENCES Usuarios(IdCliente)
);

CREATE TABLE Inicios_Sesion (
    IdSesion INT PRIMARY KEY,
    IdCliente INT,
    Fecha_Hora_Inicio DATETIME,
    Fecha_Hora_Fin DATETIME,
    FOREIGN KEY (IdCliente) REFERENCES Usuarios(IdCliente)
);

CREATE TABLE Registro_Errores (
    IdError INT PRIMARY KEY,
    IdCliente INT,
    Fecha_Hora_Error DATETIME,
    Mensaje_Error VARCHAR(100),
    FOREIGN KEY (IdCliente) REFERENCES Usuarios(IdCliente)
);

CREATE TABLE Sexo_Usuarios (
    IdCliente INT PRIMARY KEY,
    Sexo VARCHAR(50),
    FOREIGN KEY (IdCliente) REFERENCES Usuarios(IdCliente)
);