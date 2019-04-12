-- 创建用户
drop table `user` if exists;
create table `user`(
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `name` varchar(64) DEFAULT ''  COMMENT '用户名',
  `password` varchar(20) DEFAULT ''  COMMENT '密码',
  PRIMARY KEY (`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户';

