import { Form } from '@primevue/forms'

import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import SelectButton from 'primevue/selectbutton'
import Checkbox from 'primevue/checkbox';


import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Toast from 'primevue/toast';
import Message from 'primevue/message';



export default {
  install: (app) => {
    app.component('Form', Form)
    app.component('FloatLabel', FloatLabel)
    app.component('InputText', InputText)
    app.component('InputMask', InputMask)
    app.component('InputNumber', InputNumber)
    app.component('SelectButton', SelectButton)
    app.component('Checkbox', Checkbox)
    app.component('Tabs', Tabs)
    app.component('TabList', TabList)
    app.component('Tab', Tab)
    app.component('TabPanels', TabPanels)
    app.component('TabPanel', TabPanel)
    app.component('Toast', Toast)
    app.component('Message', Message)
  },
}
