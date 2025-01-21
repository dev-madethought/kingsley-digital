export interface EmailProps {
  name: string
  phone: string
  email: string
  subject: string
  message: string
  organisation?: string
  subscribe?: boolean
  contactPhone?: boolean
  contactEmail?: boolean
}
