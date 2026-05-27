import { useState } from "react";
import useStore from "../store/useStore.js";
import { BODY_GROUPS, MUSCLES_BY_GROUP } from "../data/exerciseDatabase.js";
import ExercisePicker from "../components/ExercisePicker.jsx";

export default function ExercisesPage() {
  const addCustomExercise = useStore((state) => state.addCustomExercise);
  const [form, setForm] = useState({ name: "", group: "Hombros", muscle: "Deltoide anterior", equipment: "Custom" });
  return <section className="page"><p className="eyebrow">Banco de ejercicios</p><h1>+1000 ejercicios filtrables</h1><ExercisePicker onPick={() => {}} /><div className="card"><h2>Crear ejercicio propio</h2><input placeholder="Nombre" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/><div className="filters"><select value={form.group} onChange={(e)=>setForm({...form,group:e.target.value,muscle:MUSCLES_BY_GROUP[e.target.value][0]})}>{BODY_GROUPS.map(g=><option key={g}>{g}</option>)}</select><select value={form.muscle} onChange={(e)=>setForm({...form,muscle:e.target.value})}>{MUSCLES_BY_GROUP[form.group].map(m=><option key={m}>{m}</option>)}</select></div><button className="primary" onClick={()=>{addCustomExercise(form); setForm({...form,name:""});}}>Guardar ejercicio</button></div></section>;
}
