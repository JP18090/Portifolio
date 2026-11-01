output "instance_id" {
  description = "ID da instância EC2"
  value       = data.aws_instance.portfolio.id
}

output "security_group_id" {
  description = "Security Group onde as regras foram aplicadas"
  value       = local.sg_id
}

output "elastic_ip" {
  description = "Elastic IP (IP público fixo da instância)"
  value       = aws_eip.portfolio.public_ip
}

output "dominio_https" {
  description = "Domínio gratuito apontando para o Elastic IP"
  value       = "${aws_eip.portfolio.public_ip}.sslip.io"
}

output "url_https" {
  description = "URL HTTPS (após configurar o Caddy na EC2)"
  value       = "https://${aws_eip.portfolio.public_ip}.sslip.io"
}
