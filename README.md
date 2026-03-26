# Superagent Stack

Stack integrador para montar un superagente self-hosted sin intentar rehacer proyectos upstream.

## Qué incluye este repo

- **Router propio** para decidir a qué motor mandar cada tarea.
- **Caddy** como puerta de entrada con subdominios.
- **n8n** para automatización y cron jobs.
- **Vault de Obsidian** como cerebro documental compartido.
- **Configs y plantillas** para conectar OpenClaw, OpenHands y DeerFlow.

## Filosofía

Este repo **no es un fork** de OpenClaw, OpenHands, DeerFlow o n8n.

Este repo es la **capa integradora**:

- routing
- reverse proxy
- workflows
- skills
- memoria compartida
- documentación
- bootstrap

## Arquitectura

### Entrada
- `claw.tudominio.com` → OpenClaw
- `code.tudominio.com` → OpenHands
- `lab.tudominio.com` → DeerFlow
- `flow.tudominio.com` → n8n
- `router.tudominio.com` → router HTTP interno

### Routing
El servicio `router` decide:
- coding → OpenHands
- research / tareas largas → DeerFlow
- automatización / recurrente → n8n
- operativa / multicanal → OpenClaw

### Modelos
OpenHands y DeerFlow deben apuntar a **Kilo Gateway** con modelos Xiaomi:
- `xiaomi/mimo-v2-pro:free`
- `xiaomi/mimo-v2-omni:free`
- `xiaomi/mimo-v2-flash`

### Memoria
El vault de Obsidian se monta como carpeta compartida para:
- SOPs
- decisiones
- playbooks
- prompts
- conocimiento por proyecto

## Qué corre directamente en este repo

- Caddy
- Router
- n8n
- Vault compartido

## Qué conectas desde fuera

- OpenClaw
- OpenHands
- DeerFlow

Puedes apuntarlos por URL mientras decides si los corres en el mismo VPS o en servicios separados.

## Quickstart real

1. Copia `.env.example` a `.env`
2. Rellena dominios, URLs upstream y claves
3. Lanza el stack:

```bash
docker compose -f compose/docker-compose.yml up -d
```

4. Comprueba salud:

```bash
curl http://127.0.0.1:8080/health
curl http://127.0.0.1:8080/routes
```

## Siguientes pasos

1. Conectar OpenClaw a `OPENCLAW_UPSTREAM`
2. Conectar OpenHands a `OPENHANDS_UPSTREAM`
3. Conectar DeerFlow a `DEERFLOW_UPSTREAM`
4. Crear workflows n8n reales
5. Añadir skills y políticas de routing

## Licencia

MIT para esta capa integradora.
