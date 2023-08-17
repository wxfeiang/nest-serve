DROP TABLE IF EXISTS employee;

CREATE TABLE employee (
    id bigint(32) PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    name varchar(255) NOT NULL UNIQUE COMMENT '用户姓名',
    birthday datetime NOT NULL COMMENT '用户生日',
    gender varchar(2) NOT NULL COMMENT '用户性别 0 男 1 女',
    id_number varchar(18) NOT NULL UNIQUE COMMENT '身份证号码',
    phone varchar(11) NOT NULL COMMENT '手机号',
    username varchar(64) NOT NULL COMMENT '账户名称-登陆时的账号',
    password varchar(64) NOT null COMMENT '账户密码',
    status int(11) NOT NULL DEFAULT '1' COMMENT '状态 0:禁用，1:正常',
    avatar varchar(255) NOT NULL COMMENT '头像',
    create_time datetime NOT NULL COMMENT '创建时间',
    update_time datetime NOT NULL COMMENT '更新时间',
    create_user bigint(32) NOT NULL COMMENT '创建人',
    update_user bigint(32) NOT NULL COMMENT '修改人'
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COMMENT '员工信息表';

INSERT INTO
    employee
VALUES
    (
        NULL,
        '超级管理员',
        '2000-01-01 00:00:00',
        0,
        '130725111111111111',
        '13333333333',
        'admin',
        'e10adc3949ba59abbe56e057f20f883e',
        '1',
        'https://tse4-mm.cn.bing.net/th/id/OIP-C.y2CeSO5xZJ1SjSskl1dqzwHaEo?w=279&h=180&c=7&r=0&o=5&dpr=2&pid=1.7',
        '2023-01-13 10:57:00',
        '2023-01-13 10:57:00',
        '1',
        '1'
    );