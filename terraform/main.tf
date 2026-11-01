terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Instância EC2 existente (ID é estável mesmo quando o IP muda)
data "aws_instance" "portfolio" {
  instance_id = var.ec2_instance_id
}

# Primeiro Security Group anexado à instância
locals {
  sg_id = tolist(data.aws_instance.portfolio.vpc_security_group_ids)[0]
}

# Libera a porta do frontend (Vite dev server)
resource "aws_security_group_rule" "frontend_3000" {
  type              = "ingress"
  description       = "Frontend (Vite dev server)"
  from_port         = 3000
  to_port           = 3000
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = local.sg_id
}

# Libera a porta do backend (Spring Boot API)
resource "aws_security_group_rule" "backend_8080" {
  type              = "ingress"
  description       = "Backend API (Spring Boot)"
  from_port         = 8080
  to_port           = 8080
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = local.sg_id
}

# Elastic IP: IP público FIXO que sobrevive a stop/start da instância
resource "aws_eip" "portfolio" {
  instance = data.aws_instance.portfolio.id
  domain   = "vpc"

  tags = {
    Name = "portfolio-eip"
  }
}

# Libera HTTP (80) — redirect para HTTPS + desafio do Let's Encrypt
resource "aws_security_group_rule" "http_80" {
  type              = "ingress"
  description       = "HTTP (redirect HTTPS + desafio Lets Encrypt)"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = local.sg_id
}

# Libera HTTPS (443) — Caddy reverse proxy com TLS automático
resource "aws_security_group_rule" "https_443" {
  type              = "ingress"
  description       = "HTTPS (Caddy reverse proxy)"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = local.sg_id
}
