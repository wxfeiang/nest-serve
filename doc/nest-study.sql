-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE
IF
	EXISTS `department`;
CREATE TABLE `department` (
	`id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键id',
	`name` VARCHAR ( 255 ) NOT NULL COMMENT '部门名称',
	`status` INT NOT NULL DEFAULT '1' COMMENT '状态 0 禁用; 1启用',
	`avatar` VARCHAR ( 255 ) DEFAULT NULL COMMENT '部门头像',
	`create_time` DATETIME NOT NULL COMMENT '创建时间',
	`update_time` DATETIME NOT NULL COMMENT '更新时间',
	`create_user` BIGINT NOT NULL COMMENT '创建人',
	`update_user` BIGINT NOT NULL COMMENT '修改人',
	PRIMARY KEY ( `id` ),
	UNIQUE KEY `name` ( `name` )
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COMMENT = '部门信息表';-- ----------------------------
-- Records of department
-- ----------------------------
BEGIN;
	INSERT INTO `department`
	VALUES
		( 1, '研发部门', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/ba1337e7-34f5-45a9-b55c-2d379e9f5a37.jpg', '2023-01-28 15:28:00', '2023-01-28 15:28:00', 1, 1 );
	INSERT INTO `department`
	VALUES
		( 2, '研发01', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/ba1337e7-34f5-45a9-b55c-2d379e9f5a37.jpg', '2023-02-01 14:53:59', '2023-02-01 14:53:59', 1, 1 );
	INSERT INTO `department`
	VALUES
		( 3, '研发02', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/ba1337e7-34f5-45a9-b55c-2d379e9f5a37.jpg', '2023-02-01 14:54:03', '2023-02-01 14:54:03', 1, 1 );
	INSERT INTO `department`
	VALUES
		( 4, '研发03', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/ba1337e7-34f5-45a9-b55c-2d379e9f5a37.jpg', '2023-02-01 14:54:11', '2023-02-01 14:54:11', 1, 1 );
	INSERT INTO `department`
	VALUES
		( 5, '研发04', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/ba1337e7-34f5-45a9-b55c-2d379e9f5a37.jpg', '2023-02-01 14:54:15', '2023-02-01 14:54:15', 1, 1 );
	INSERT INTO `department`
	VALUES
		( 6, '研发05', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/ba1337e7-34f5-45a9-b55c-2d379e9f5a37.jpg', '2023-02-01 14:54:20', '2023-02-01 14:54:20', 1, 1 );
	INSERT INTO `department`
	VALUES
		( 7, '研发06', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/ba1337e7-34f5-45a9-b55c-2d379e9f5a37.jpg', '2023-02-01 14:54:25', '2023-02-01 14:54:25', 1, 1 );
	INSERT INTO `department`
	VALUES
		( 8, '研发07', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/ba1337e7-34f5-45a9-b55c-2d379e9f5a37.jpg', '2023-02-01 14:54:30', '2023-02-01 14:54:30', 1, 1 );
	INSERT INTO `department`
	VALUES
		( 9, '研发08', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/ba1337e7-34f5-45a9-b55c-2d379e9f5a37.jpg', '2023-02-01 14:54:35', '2023-02-01 14:54:35', 1, 1 );
	INSERT INTO `department`
	VALUES
		( 10, '研发09', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/ba1337e7-34f5-45a9-b55c-2d379e9f5a37.jpg', '2023-02-01 14:54:40', '2023-02-01 14:54:40', 1, 1 );
	INSERT INTO `department`
	VALUES
		( 12, '研发10', 1, 'http://nest-study-backend.oss-cn-hangzhou.aliyuncs.com/2023/02/01/5539df3f-db62-4fd1-bc02-f11e9395b7e1.jpg', '2023-02-01 14:56:07', '2023-02-01 14:56:07', 1, 1 );
	COMMIT;-- ----------------------------
-- Table structure for employee
-- ----------------------------
	DROP TABLE
	IF
		EXISTS `employee`;
	CREATE TABLE `employee` (
		`id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
		`name` VARCHAR ( 255 ) NOT NULL COMMENT '用户姓名',
		`birthday` DATETIME NOT NULL COMMENT '用户生日',
		`gender` VARCHAR ( 2 ) NOT NULL COMMENT '用户性别 0 男 1 女',
		`id_number` VARCHAR ( 18 ) NOT NULL COMMENT '身份证号码',
		`phone` VARCHAR ( 11 ) NOT NULL COMMENT '手机号',
		`username` VARCHAR ( 64 ) NOT NULL COMMENT '账户名称-登陆时的账号',
		`password` VARCHAR ( 64 ) NOT NULL COMMENT '账户密码',
		`status` INT NOT NULL DEFAULT '1' COMMENT '状态 0:禁用，1:正常',
		`avatar` VARCHAR ( 255 ) NOT NULL COMMENT '头像',
		`create_time` DATETIME NOT NULL COMMENT '创建时间',
		`update_time` DATETIME NOT NULL COMMENT '更新时间',
		`create_user` BIGINT NOT NULL COMMENT '创建人',
		`update_user` BIGINT NOT NULL COMMENT '修改人',
		PRIMARY KEY ( `id` ),
		UNIQUE KEY `name` ( `name` ),
		UNIQUE KEY `id_number` ( `id_number` )
	) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COMMENT = '员工信息表';-- ----------------------------
-- Records of employee
-- ----------------------------
	BEGIN;
		INSERT INTO `employee`
		VALUES
			( 1, '超级管理员', '2000-01-01 00:00:00', '0', '130725111111111111', '13333333333', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 1, 'https://tse4-mm.cn.bing.net/th/id/OIP-C.y2CeSO5xZJ1SjSskl1dqzwHaEo?w=279&h=180&c=7&r=0&o=5&dpr=2&pid=1.7', '2023-01-13 10:57:00', '2023-02-02 10:34:49', 1, 1 );
		COMMIT;-- ----------------------------
-- Table structure for track_log
-- ----------------------------
		DROP TABLE
		IF
			EXISTS `track_log`;
		CREATE TABLE `track_log` (
			`id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
			`module_name` VARCHAR ( 30 ) NOT NULL COMMENT '模块名称',
			`module_time` DATETIME NOT NULL COMMENT '模块时间',
			`num` INT DEFAULT '1' COMMENT '访问量',
			PRIMARY KEY ( `id` )
		) ENGINE = INNODB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8 COMMENT = '跟踪记录表';-- ----------------------------
-- Records of track_log
-- ----------------------------
			DROP TABLE
			IF
				EXISTS `role`;
			CREATE TABLE `role` (
				`id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键id',
				`name` VARCHAR ( 255 ) DEFAULT NULL COMMENT '角色名称',
				`e_id` BIGINT DEFAULT NULL COMMENT '员工ID',
				`create_time` DATETIME NOT NULL COMMENT '创建时间',
				`update_time` DATETIME NOT NULL COMMENT '更新时间',
				`create_user` BIGINT NOT NULL COMMENT '创建人',
				`update_user` BIGINT NOT NULL COMMENT '修改人',
				PRIMARY KEY ( `id` )
			) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COMMENT = '角色表';-- ----------------------------
-- Table structure for emp_role
-- ----------------------------
			DROP TABLE
			IF
				EXISTS `emp_role`;
			CREATE TABLE `emp_role` (
				`id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键id',
				`name` VARCHAR ( 255 ) DEFAULT NULL COMMENT '角色名称',
				`r_id` BIGINT DEFAULT NULL COMMENT '角色ID',
				`e_id` BIGINT DEFAULT NULL COMMENT '员工ID',
				`create_time` DATETIME NOT NULL COMMENT '创建时间',
				`update_time` DATETIME NOT NULL COMMENT '更新时间',
				`create_user` BIGINT NOT NULL COMMENT '创建人',
				`update_user` BIGINT NOT NULL COMMENT '修改人',
				PRIMARY KEY ( `id` )
			) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COMMENT = '员工角色关系表';-- ----------------------------
-- Table structure for emp_role

-- Table structure for organization
-- ----------------------------
			DROP TABLE
			IF
				EXISTS `organization`;
			CREATE TABLE `organization` (
				`id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键id',
				`name` VARCHAR ( 255 ) DEFAULT NULL COMMENT '组织架构名',
				`sort` INT DEFAULT NULL COMMENT '组织架构顺序',
				`d_id` BIGINT DEFAULT NULL COMMENT '部门ID',
				`e_id` BIGINT DEFAULT NULL COMMENT '员工ID',
				`p_id` BIGINT DEFAULT NULL COMMENT '父级ID',
				`create_time` DATETIME NOT NULL COMMENT '创建时间',
				`update_time` DATETIME NOT NULL COMMENT '更新时间',
				`create_user` BIGINT NOT NULL COMMENT '创建人',
				`update_user` BIGINT NOT NULL COMMENT '修改人',
				PRIMARY KEY ( `id` )
			) ENGINE = INNODB AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8 COMMENT = '组织架构表';-- ----------------------------
-- Records of organization
-- ----------------------------
-- ----------------------------
			BEGIN;
				INSERT INTO `organization`
				VALUES
					( 1, '研发部门', 3, 1, NULL, 0, '2023-02-01 14:52:50', '2023-02-01 15:01:26', 1, 1 );
				INSERT INTO `organization`
				VALUES
					( 2, NULL, NULL, NULL, 1, 1, '2023-02-01 14:53:15', '2023-02-01 14:53:15', 1, 1 );
				INSERT INTO `organization`
				VALUES
					( 3, '研发01', 1, 2, NULL, 0, '2023-02-01 14:55:01', '2023-02-01 15:01:26', 1, 1 );
				INSERT INTO `organization`
				VALUES
					( 4, '研发02', 2, 3, NULL, 3, '2023-02-01 14:55:14', '2023-02-01 15:01:26', 1, 1 );
				INSERT INTO `organization`
				VALUES
					( 5, '研发03', 4, 4, NULL, 3, '2023-02-01 14:56:26', '2023-02-01 14:56:42', 1, 1 );
				INSERT INTO `organization`
				VALUES
					( 6, '研发04', 5, 5, NULL, 3, '2023-02-01 14:56:32', '2023-02-01 14:56:42', 1, 1 );
				COMMIT;
-- ----------------------------
-- Table structure for dict
-- ----------------------------
				DROP TABLE
				IF
					EXISTS `dict`;
				CREATE TABLE `dict` (
					`id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键id',
					`name` VARCHAR ( 255 ) DEFAULT NULL COMMENT '字典名称',
					s `dict_type` VARCHAR ( 255 ) DEFAULT NULL COMMENT '字典类型',
					`status` INT NOT NULL DEFAULT '1' COMMENT '状态 0 禁用; 1启用',
					`describe` VARCHAR ( 255 ) DEFAULT NULL COMMENT '描述，备注',
					`create_time` DATETIME NOT NULL COMMENT '创建时间',
					`update_time` DATETIME NOT NULL COMMENT '更新时间',
					`create_user` BIGINT NOT NULL COMMENT '创建人',
					`update_user` BIGINT NOT NULL COMMENT '修改人',
					PRIMARY KEY ( `id` )
				) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COMMENT = '字典管理表';-- ----------------------------
-- Table structure for dictType
-- ----------------------------
				DROP TABLE
				IF
					EXISTS `dict_type`;
				CREATE TABLE `dict_type` (
					`id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键id',
					`name` VARCHAR ( 255 ) DEFAULT NULL COMMENT '字典值名称',
					`value` INT DEFAULT NULL COMMENT '字典值',
					`sort` INT DEFAULT NULL COMMENT '字典值顺序',
					`d_id` BIGINT DEFAULT NULL COMMENT '父级ID',
					`status` INT NOT NULL DEFAULT '1' COMMENT '状态 0 禁用; 1启用',
					`list_class` VARCHAR ( 255 ) DEFAULT NULL COMMENT '样式属性',
					`css_class` VARCHAR ( 255 ) DEFAULT NULL COMMENT '回显样式',
					`describe` VARCHAR ( 255 ) DEFAULT NULL COMMENT '描述，备注',
					`create_time` DATETIME NOT NULL COMMENT '创建时间',
					`update_time` DATETIME NOT NULL COMMENT '更新时间',
					`create_user` BIGINT NOT NULL COMMENT '创建人',
					`update_user` BIGINT NOT NULL COMMENT '修改人',
				PRIMARY KEY ( `id` )
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COMMENT = '字典值对应表';