package com.bukuta.helloworld.models;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;


@Data
@Entity
@Table(name = "user")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @NotBlank(message = "内容不能为空")
  @Length(max = 128, message = "内容长度不能超过128个字符")
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private integer id;


  @NotBlank(message = "内容不能为空")
  @Length(max = 128, message = "内容长度不能超过128个字符")
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private string name;


  @NotBlank(message = "内容不能为空")
  @Length(max = 128, message = "内容长度不能超过128个字符")
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private string password;

}


