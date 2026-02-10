"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/transversal/forms/FormField"
import { Input } from "@/components/transversal/forms/Input"
import { Checkbox } from "@/components/transversal/forms/Checkbox"
import { Select } from "@/components/transversal/forms/Select"
import { DatePicker } from "@/components/transversal/forms/DatePicker"

// --- Schema de Validación Zod ---
const formSchema = z.object({
  // 1. Representante Legal
  legalRepresentative: z.string().min(1, "El nombre del representante es requerido"),

  // 2. Datos del Cliente
  fullName: z.string().min(1, "El nombre completo es requerido"),
  documentNumber: z.coerce.number({ invalid_type_error: "Debe ser un número" }).min(1, "El número de documento es requerido"),
  birthDate: z.string().min(1, "La fecha de nacimiento es requerida"),
  email: z.string().email("Correo electrónico inválido"),
  cellPhone: z.coerce.number({ invalid_type_error: "Debe ser un número" }).min(1000000, "Número de celular inválido"),

  // 3. Datos del Negocio
  businessName: z.string().min(1, "El nombre del negocio es requerido"),
  relationshipWithBusiness: z.string().min(1, "Seleccione su relación con el negocio"),
  city: z.string().min(1, "Seleccione una ciudad"),
  businessAddress: z.string().min(1, "La dirección del negocio es requerida"),
  businessType: z.string().min(1, "Seleccione el tipo de negocio"),
  businessAge: z.string().min(1, "Seleccione la antigüedad del negocio"),
  employeesCount: z.coerce.number().min(0, "Debe ser mayor o igual a 0"),
  clientsCount: z.coerce.number().min(0, "Debe ser mayor o igual a 0"),
  premisesSize: z.coerce.number().min(1, "El tamaño debe ser mayor a 0"),
  isRenting: z.boolean().default(false), // Checkbox sí/no (true = sí)

  // 4. Información Financiera
  totalAssets: z.coerce.number().min(0, "El valor debe ser positivo"),
  monthlySales: z.coerce.number().min(0, "El valor debe ser positivo"),
  inventoryExpenses: z.coerce.number().min(0, "El valor debe ser positivo"),

  // 5. Información Adicional
  isPlatamCustomer: z.boolean().default(false).optional(),
  creditLineNeeded: z.coerce.number().min(100000, "El cupo mínimo es 100,000"),

  // 6. Autorizaciones
  authorization: z.boolean().refine((val) => val === true, {
    message: "Debes autorizar el tratamiento de datos para continuar",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function NaturalPersonOnboardingPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      legalRepresentative: "",
      fullName: "",
      documentNumber: undefined,
      birthDate: "",
      email: "",
      cellPhone: undefined,
      businessName: "",
      relationshipWithBusiness: "",
      city: "",
      businessAddress: "",
      businessType: "",
      businessAge: "",
      employeesCount: undefined,
      clientsCount: undefined,
      premisesSize: undefined,
      isRenting: false,
      totalAssets: undefined,
      monthlySales: undefined,
      inventoryExpenses: undefined,
      isPlatamCustomer: false,
      creditLineNeeded: undefined,
      authorization: false,
    },
  })

  function onSubmit(data: FormValues) {
    console.log("Formulario enviado:", data)
    alert("Formulario validado y enviado correctamente. Revisa la consola para ver los datos.")
    // Aquí iría la lógica de envío al backend
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Registro Persona Natural</h1>
          <p className="mt-2 text-slate-600">Completa la información para solicitar tu crédito Platam.</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* 1. Representante Legal */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-primary-600 border-b border-slate-100 pb-2">
                  1. Representante Legal
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="legalRepresentative"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre del Representante Legal</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej. Juan Pérez" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* 2. Datos del Cliente */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-primary-600 border-b border-slate-100 pb-2">
                  2. Datos del Cliente
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombres y Apellidos" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="documentNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Documento</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Nacimiento</FormLabel>
                        <FormControl>
                          <DatePicker {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cellPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Celular</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="3001234567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* 3. Datos del Negocio */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-primary-600 border-b border-slate-100 pb-2">
                  3. Datos del Negocio
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre del Negocio</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej. Tienda La Esperanza" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="relationshipWithBusiness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relación con el Negocio</FormLabel>
                        <FormControl>
                          <Select {...field}>
                            <option value="">Seleccione...</option>
                            <option value="owner">Propietario</option>
                            <option value="partner">Socio</option>
                            <option value="manager">Administrador</option>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Select {...field}>
                            <option value="">Seleccione...</option>
                            <option value="bogota">Bogotá</option>
                            <option value="medellin">Medellín</option>
                            <option value="cali">Cali</option>
                            <option value="barranquilla">Barranquilla</option>
                            <option value="otra">Otra</option>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="businessAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección del Negocio</FormLabel>
                        <FormControl>
                          <Input placeholder="Calle 123 # 45-67" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Negocio</FormLabel>
                        <FormControl>
                          <Select {...field}>
                            <option value="">Seleccione...</option>
                            <option value="retail">Comercio al por menor</option>
                            <option value="services">Servicios</option>
                            <option value="food">Alimentos y Bebidas</option>
                            <option value="manufacturing">Manufactura</option>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="businessAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Antigüedad del Negocio</FormLabel>
                        <FormControl>
                          <Select {...field}>
                            <option value="">Seleccione...</option>
                            <option value="less_1_year">Menos de 1 año</option>
                            <option value="1_3_years">1 a 3 años</option>
                            <option value="more_3_years">Más de 3 años</option>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="employeesCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Empleados</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientsCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cantidad de Clientes (Aprox)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="premisesSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tamaño del Local (m²)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isRenting"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            ¿Arrienda el local donde opera su negocio?
                          </FormLabel>
                          <FormDescription>
                            Marque si paga arriendo por el local principal.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* 4. Información Financiera */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-primary-600 border-b border-slate-100 pb-2">
                  4. Información Financiera
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="totalAssets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Activos</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="monthlySales"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ventas Mensuales</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="inventoryExpenses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gastos Inventario (Mensual)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* 5. Información Adicional */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-primary-600 border-b border-slate-100 pb-2">
                  5. Información Adicional
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="creditLineNeeded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>¿Qué cupo necesitas?</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ej. 5000000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="isPlatamCustomer"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-8">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            ¿Eres cliente actual de Platam?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* 6. Autorizaciones */}
              <section className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="authorization"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-primary-200 bg-primary-50 p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-slate-900 font-medium">
                          Autorización de tratamiento de datos
                        </FormLabel>
                        <FormDescription className="text-slate-600 text-xs text-justify">
                          Autorizo a Platam Colombia S.A.S. a consultar mi información en centrales de riesgo como Datacrédito, validar mis datos para el análisis de crédito y acepto la Política de Privacidad. Entiendo que esta consulta no genera reporte negativo ni afecta mi puntaje.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </section>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  className="bg-primary-400 text-dark-950 px-8 py-3 rounded-lg font-bold hover:bg-primary-500 hover:shadow-primary active:scale-95 transition-all duration-200 w-full md:w-auto"
                >
                  Enviar Solicitud
                </button>
              </div>

            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}