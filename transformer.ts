interface ConfigItem {
  local: string;
  remote: string;
}
interface transformParams {
  data: {
    [keyName: string]: any;
  };
  config?: {
    beforeTrans: () => any;
    afterTrans: () => any;
  };
}
// 传入要构建的class 类似demoData的类
class Transformer {
  private localToRemoteMap = {};
  private remoteToLocalMap = {};
  private beforeTrans;
  private afterTrans;
  private init(data: ConfigItem[]) {
    data.forEach((d) => {
      this.localToRemoteMap[d.local] = d.remote;
      this.remoteToLocalMap[d.remote] = d.local;
    });
  }
  constructor(data: ConfigItem[]) {
    this.init(data);
  }
  private realTransform(data, type) {
    // 判断类型，如果
  }
  private realPropReplace(data, map) {
    const type = Object.prototype.toString.call(data);
    // const valueTypeList = [
    //   "[object Number]",
    //   "[object String]",
    //   "[object Null]",
    //   "[object Undefined]",
    // ];
    // if (valueTypeList.includes(type)) {
    //   return data;
    // } else
    if (type === "[object Array]") {
      return (data as []).map((d) => {
        return this.realPropReplace(d, map);
      });
    } else if (type === "[object Object]") {
      const newObj = {};
      Object.keys(data).forEach((key) => {
        newObj[map[key]] = data[key];
      });
      return newObj;
    } else {
      return data;
    }
  }
  localToRemote(props: transformParams) {
    const { data } = props;
    const newData = this.realPropReplace(props, this.localToRemoteMap);
  }
  remoteToLocal(props: transformParams) {
    const { data } = props;
    const newData = this.realPropReplace(props, this.localToRemoteMap);
  }
}

export default Transformer;
