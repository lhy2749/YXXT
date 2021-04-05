//验证文本提示信息
$.extend(validatePrompt, {
    /*联系人*/
    lxr: {
        onFocus: "2-50位字符，可由中文或英文组成",
        succeed: "",
        isNull: "请输入联系人姓名",
        error: {
            badLength: "联系人姓名长度只能在2-50位字符之间",
            badFormat: "联系人姓名只能由中文或英文组成"
        }
    },

    /*法院电话*/
    fydh: {
        onFocus: "请填写法院电话",
        succeed: "",
        isNull: "请输入法院电话",
        error: "电话格式错误，请重新输入"
    },

    /*法院别名*/
    fybm: {
        onFocus: "请填写法院别名。",
        succeed: "",
        isNull: "请输入法院别名",
        error: {
            badLength: "法院别名长度只能在4-40位字符之间",
            badFormat: "法院别名只能由中文、英文、数字及“_”、“-”、()、（）组成"
        }
    },

    /*法院地址*/
    fydz: {
        onFocus: "请详细填写法院地址　如：北京市海淀区苏州街20号银丰大厦B座",
        succeed: "",
        isNull: "请输入法院地址",
        error: {
            badLength: "法院地址长度只能在4-50位字符之间",
            badFormat: "法院地址只能由中文、英文、数字及“_”、“-”、()、（）、#组成"
        }
    },

    /*法院网址*/
    fywz: {
        onFocus: "如：http://www.baidu.com",
        succeed: "",
        isNull: "请输入法院网址",
        error: {
            badLength: "法院网址长度只能在80位字符之内",
            badFormat: "法院网址格式不正确。应如：http://www.baidu.com"
        }
    }
});
$.extend(validateFunction, {
    /*联系人*/
    lxr: function (option) {
        var length = validateRules.betweenLength(option.value.replace(/[^\x00-\xff]/g, "**"), 2, 50);
        var format = validateRules.isRealName(option.value);
        if (!length) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        } else {
            if (!format) {
                validateSettings.error.run(option, option.prompts.error.badFormat);
            } else {
                validateSettings.succeed.run(option);
            }
        }
    },

    /*法院电话*/
    fydh: function (option) {
        var format = validateRules.isTel(option.value);
        if (!format) {
            validateSettings.error.run(option, option.prompts.error);
        } else {
            validateSettings.succeed.run(option);
        }
    },

    /*法院别名*/
    fybm: function (option) {
        var length = validateRules.betweenLength(option.value.replace(/[^\x00-\xff]/g, "**"), 4, 40);
        var format = validateRules.isCompanyname(option.value);
        if (!length) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        } else {
            if (!format) {
                validateSettings.error.run(option, option.prompts.error.badFormat);
            } else {
                validateSettings.succeed.run(option);
            }
        }
    },

    /*法院地址*/
    fydz: function (option) {
        var length = validateRules.betweenLength(option.value.replace(/[^\x00-\xff]/g, "**"), 4, 500);
        var format = validateRules.isCompanyaddr(option.value);
        if (!length) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        } else {
            if (!format) {
                validateSettings.error.run(option, option.prompts.error.badFormat);
            } else {
                validateSettings.succeed.run(option);
            }
        }
    },

    /*法院网址*/
    fywz: function (option) {
        var length = validateRules.betweenLength(option.value, 0, 80);
        var format = validateRules.isCompanysite(option.value);
        if (!length) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        } else {
            if (!format) {
                validateSettings.error.run(option, option.prompts.error.badFormat);
            } else {
                validateSettings.succeed.run(option);
            }
        }
    },
    FORM_validate: function () {

        /*联系人*/
        $("#lxr").jdValidate(validatePrompt.lxr, validateFunction.lxr, true);
        /*法院电话*/
        $("#fydh").jdValidate(validatePrompt.fydh, validateFunction.fydh, true);
        /*法院别名*/
        $("#fybm").jdValidate(validatePrompt.fybm, validateFunction.fybm, true);
        /*法院地址*/
        $("#fydz").jdValidate(validatePrompt.fydz, validateFunction.fydz, true);
        /*法院网址*/
        $("#fywz").jdValidate(validatePrompt.fywz, validateFunction.fywz, true);
        return validateFunction.FORM_submit(["#lxr", "#fydh", "#fybm", "#fydz", "#fywz"]);
    }
});

//联系人姓名验证
$("#lxr").jdValidate(validatePrompt.lxr, validateFunction.lxr);
//法院电话验证
$("#fydh").jdValidate(validatePrompt.fydh, validateFunction.fydh);
//手机验证
$("#mobile").jdValidate(validatePrompt.mobile, validateFunction.mobile);
//法院别名验证
$("#fybm").jdValidate(validatePrompt.fybm, validateFunction.fybm);
//法院地址验证
$("#fydz").jdValidate(validatePrompt.fydz, validateFunction.fydz);
//法院网址验证
$("#fywz").jdValidate(validatePrompt.fywz, validateFunction.fywz);
//表单提交验证和服务器请求
function doUpdate(){
    var flag = validateFunction.FORM_validate();
    if (flag) {
        $(this).attr({
            "disabled": "disabled"
        }).attr({
            "value": "提交中,请稍等"
        });
      //更改法院信息
 	layer.confirm('是否修改法院信息？', function(index) {		
    	var params= $("form").serialize();
    		$.ajax({
    			type : "post",
    			url : "updateDwxx.action",
    			dataType : 'json',
    			data : params,
    			 
    			success: function(data, textStatus) {
    				if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {
    				
    					layer.msg('修改成功!', {
    						icon : 6,
    						time : 2000
    					});
    					
    				} else {
    					layer.msg('设置失败，请联系管理员!', {
    						icon : 5,
    						time : 1000
    					});
    				}
    			},
    			error : function() {
    				layer.msg('请求数据失败，请联系管理员!', {
    					icon : 5,
    					time : 1000
    				});
    			}
    		});
    	
    });

    }
};
