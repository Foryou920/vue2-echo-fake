const Options = {
  default: {
    lable: "默认",
    value: "default",
    icon: "my-icon-more"
  },
  random: {
    lable: "随机播放",
    value: "random",
    icon: "my-icon-random"
  },
  singleRepeat: {
    label: "单曲循环",
    value: "singleRepeat",
    icon: "my-icon-repeatone"
  },
  listRepeat: {
    label: "列表循环",
    value: "listRepeat",
    icon: "my-icon-repeat"
  }
};

export let ArrayOptions = []
Object.keys(Options).forEach(key => {
  ArrayOptions.push(Options[key]);
});

export default Options;
