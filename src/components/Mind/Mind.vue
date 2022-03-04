<template>
    <div :key="refresh" :style="{ height }">
        <div id="jsmind_container"></div>
        <div style="display: none">
            <input class="file" type="file" id="image-chooser" accept="image/*" />
        </div>
    </div>
</template>

<script setup lang="ts">
import 'jsmind/style/jsmind.css';
import jsMind from 'jsmind/js/jsmind.js';
import 'jsmind/js/jsmind.draggable.js';
import 'jsmind/js/jsmind.screenshot.js';
import { withDefaults, defineProps, defineEmits, reactive, ref, onMounted, watchEffect, watch } from 'vue';
const props = withDefaults(
    defineProps<{
        values: object;
        options: object;
        height?: string;
    }>(),
    {
        values: () => {
            return {};
        },
        options: () => {
            return {};
        },
        height: '',
    }
);
const emit = defineEmits(['initJM']);
let jm: any = ref({});
const refresh = ref(1);
const value = ref({});
const default_options = reactive({
    container: 'jsmind_container',
    editable: false, // 是否启用编辑
    theme: 'primary', // 主题
    mode: 'full', // 显示模式
    support_html: true, // 是否支持节点里的HTML元素
    default_event_handle: {
        enable_mousedown_handle: false,
        enable_click_handle: false,
    },
    view: {
        engine: 'canvas', // 思维导图各节点之间线条的绘制引擎
        hmargin: 100, // 思维导图距容器外框的最小水平距离
        vmargin: 50, // 思维导图距容器外框的最小垂直距离
        line_width: 2, // 思维导图线条的粗细
        line_color: '#555', // 思维导图线条的颜色
    },
    layout: {
        hspace: 30, // 节点之间的水平间距
        vspace: 20, // 节点之间的垂直间距
        pspace: 13, // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
    },
    shortcut: {
        enable: true, // 是否启用快捷键
        handles: {
            SavePNG() {
                jm.screenshot.shootDownload();
            },
        }, // 命名的快捷键事件处理器
        mapping: {
            // 快捷键映射
            addchild: 45, // <Insert>
            addbrother: 13, // <Enter>
            editnode: 113, // <F2>
            delnode: 46, // <Delete>
            toggle: 32, // <Space>
            left: 37, // <Left>
            up: 38, // <Up>
            right: 39, // <Right>
            down: 40, // <Down>
            SavePNG: jsMind.key?.ctrl + 83,
        },
    },
});
watchEffect(() => {
    if (props.values) {
        refresh.value++;
    }
});
const init = () => {
    value.value = props.values;
    let oldDom = document.getElementsByClassName('jsmind-inner')[0] as Element | null | undefined;
    if (oldDom !== null && oldDom !== undefined) {
        oldDom.remove();
    }
    const options = Object.assign(default_options, props.options);
    jm.value = jsMind.show(options, value.value);
    emit('initJM', jm);
    //console.log(jm.value.get_data())
};
watch(
    () => props.values,
    () => {
        init();
    },
    { deep: true }
);
onMounted(() => {
    init();
});
</script>

<style lang="scss" scoped>
:deep #jsmind_container {
    height: 100%;
    width: 100%;
    text-align: left;
    /* greensea theme */ /* greensea 即是主题名 */
    jmnodes.theme-custom jmnode {
        background-color: #fff;
        color: rgba(0, 0, 0, 0.75);
        border: 1px solid #386bff;
        border-radius: 12px;
        box-shadow: none;
        font-size: 14px;
        font-weight: bold;
    } /* 节点样式 */
    jmnodes.theme-custom jmnode:hover {
        background-color: #ebf0ff;
    } /* 鼠标悬停的节点样式 */
    jmnodes.theme-custom jmnode.selected {
        // background-color: #11f;
        // color: #fff;
    } /* 选中的节点样式 */
    jmnodes.theme-custom jmnode.root {
        background-color: #ebf0ff;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.9);
        font-weight: bold;
        border: 2px solid #386bff;
    } /* 根节点样式 */
    jmnodes.theme-custom jmexpander {
    } /* 展开/关闭节点的控制点样式 */
    jmnodes.theme-custom jmexpander:hover {
    } /* 鼠标悬停展开/关闭节点的控制点样式 */
}
</style>
