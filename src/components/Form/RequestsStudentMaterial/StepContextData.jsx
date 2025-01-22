import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import AutocompleteField from "../../Input/AutocompleteField";
import axios from "axios";

const StepContextData = ({
  reason,
  setReason,
  subject,
  setSubject,
  teacher,
  setTeacher,
  group,
  setGroup,
  handleNextStep,
  handlePreviousStep,
}) => {
  const [reasons, setReasons] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchReasons();
    fetchSubjects();
    fetchTeachers();
    fetchGroups();
    // Cargar datos desde sessionStorage cuando el componente se monta
    const storedReason = JSON.parse(sessionStorage.getItem("reason"));
    const storedSubject = JSON.parse(sessionStorage.getItem("subject"));
    const storedTeacher = JSON.parse(sessionStorage.getItem("teacher"));
    const storedGroup = JSON.parse(sessionStorage.getItem("group"));

    if (storedReason) setReason(storedReason);
    if (storedSubject) setSubject(storedSubject);
    if (storedTeacher) setTeacher(storedTeacher);
    if (storedGroup) setGroup(storedGroup);
  }, []);

  const fetchReasons = async () => {
    // Simula la obtención de datos de motivos
    const reasonsData = [
      { value: "1", label: "Investigación" },
      { value: "2", label: "Proyecto" },
      { value: "3", label: "Tesis" },
      { value: "4", label: "Trabajo de curso" },
      { value: "5", label: "Práctica" },
      { value: "6", label: "Examen" },
      { value: "7", label: "Desarrollo personal" },
      { value: "8", label: "Competencia" },
      { value: "9", label: "Capacitación" },
      { value: "10", label: "Otro" },
    ];
    setReasons(reasonsData);
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/subjects`
      );
      const subjectsData = response.data.map((subject) => ({
        value: subject.id,
        label: subject.nombre_materia,
      }));
      setSubjects(subjectsData);
    } catch (error) {
      console.error("Error al obtener materias:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/teachers`
      );
      const teachersData = response.data.map((teacher) => ({
        value: teacher.id,
        label: teacher.nombre_maestro,
      }));
      setTeachers(teachersData);
    } catch (error) {
      console.error("Error al obtener profesores:", error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/groups`
      );
      const groupsData = response.data.map((group) => ({
        value: group.id,
        label: group.nombre_grupo,
      }));
      setGroups(groupsData);
    } catch (error) {
      console.error("Error al obtener grupos:", error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!reason.value) newErrors.reason = "El motivo es obligatorio";
    if (!subject.value) newErrors.subject = "La materia es obligatoria";
    if (!teacher.value) newErrors.teacher = "El profesor es obligatorio";
    if (!group.value) newErrors.group = "El grupo es obligatorio";
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Guardar los datos en sessionStorage
      sessionStorage.setItem("reason", JSON.stringify(reason));
      sessionStorage.setItem("subject", JSON.stringify(subject));
      sessionStorage.setItem("teacher", JSON.stringify(teacher));
      sessionStorage.setItem("group", JSON.stringify(group));
      handleNextStep();
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-4">
        <motion.h2
          className="text-2xl font-bold text-center text-white mt-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Ingrese los datos de contexto
        </motion.h2>
        <motion.form
          action="#"
          className="mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="grid gap-6 mb-6 sm:grid-cols-2">
            <AutocompleteField
              label="Motivo"
              name="reason"
              id="reason"
              value={reason}
              onChange={(newValue) => {
                setReason(newValue);
                sessionStorage.setItem("reason", JSON.stringify(newValue));
              }}
              options={reasons}
              error={errors.reason}
              delay={0.5}
            />
            <AutocompleteField
              label="Materia"
              name="subject"
              id="subject"
              value={subject}
              onChange={(newValue) => {
                setSubject(newValue);
                sessionStorage.setItem("subject", JSON.stringify(newValue));
              }}
              options={subjects}
              error={errors.subject}
              delay={1}
            />
            <AutocompleteField
              label="Profesor"
              name="teacher"
              id="teacher"
              value={teacher}
              onChange={(newValue) => {
                setTeacher(newValue);
                sessionStorage.setItem("teacher", JSON.stringify(newValue));
              }}
              options={teachers}
              error={errors.teacher}
              delay={1.5}
            />
            <AutocompleteField
              label="Grupo"
              name="group"
              id="group"
              value={group}
              onChange={(newValue) => {
                setGroup(newValue);
                sessionStorage.setItem("group", JSON.stringify(newValue));
              }}
              options={groups}
              error={errors.group}
              delay={1.75}
            />
          </div>
        </motion.form>

        <div className="flex justify-center space-x-4 mt-4">
          <motion.button
            className="py-2 px-4 btn-confirm-no bg-transparent text-white border rounded-lg hover:bg-white hover:text-black transition duration-500 flex items-center"
            type="button"
            onClick={handlePreviousStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
          >
            <ChevronLeftIcon className="w-6 h-6" />
            <span className="ml-2">Regresar</span>
          </motion.button>
          <motion.button
            className="py-2 px-4 btn-confirm-no bg-transparent text-white border rounded-lg hover:bg-white hover:text-black transition duration-500 flex items-center"
            type="button"
            onClick={handleNext}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.25 }}
          >
            <span className="mr-2">Siguiente</span>
            <ChevronRightIcon className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default StepContextData;
