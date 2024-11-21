import { createSlice } from '@reduxjs/toolkit'

export const Field = createSlice({
  name: 'Field',
  initialState: {
    value: []
  },
  reducers: {
    changeFieldValue: (state, action) => {
      state.value = action.payload
    },
    changeSpecificFieldValue:(state,action)=>{
      state.value=state.value.map((x)=>{
        if(x.Id===action.payload[0]){
          return {...x,...action.payload[1]}
        }
        return x;
      })
    },
    removeSpecificField:(state,action)=>{
      state.value=state.value.filter((x)=>x.Id!==action.payload)
    }
  }
})
 //reducres functions take single parameter which is action to get multiple parameter 
//  wrap them in a object or array check editbox component
// Action creators are generated for each case reducer function
export const { changeFieldValue,changeSpecificFieldValue,removeSpecificField } = Field.actions

export default Field.reducer