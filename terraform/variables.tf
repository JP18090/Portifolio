variable "aws_region" {
  description = "Região AWS da instância EC2"
  type        = string
  default     = "us-east-2"
}

variable "ec2_instance_id" {
  description = "ID da instância EC2 existente"
  type        = string
  default     = "i-0c59d47148139087a"
}
