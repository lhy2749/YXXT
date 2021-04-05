# conding = utf8

import jpype


def get_keyphrase(text):
    jvmPath = jpype.getDefaultJVMPath()
    ext_classpath = "./java_lib/hanlp-1.8.0.jar"
    jvmArg = " -Djava.class.path = " + ext_classpath
    try:
        jpype.startJVM(jvmPath,"-ea","-Djava.class.path=%s" % ext_classpath)
    except:
        pass
    JClass = jpype.JClass('com.hankcs.hanlp.HanLP')
    doc = "昆明火车站暴力恐怖袭击事件警察速写，新华社昆明３月３日电。面对危险，他们没有退缩。在昆明火车站严重暴力恐怖袭击事件中，在人民群众生命受到威胁的一刻，他们喊出“来砍我”，用自己的身躯挡住暴徒的刀，毅然与暴徒搏斗，护佑人民群众生命。"
    result = list(JClass.extractPhrase(text, 3))
    # jpype.shutdownJVM()
    return result

