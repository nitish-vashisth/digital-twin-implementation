                    ┌───────────────────────────┐
                    │       CLOUD CONTROL       │
                    │                           │
                    │  Customer Portal          │
                    │       │                   │
                    │       ▼                   │
                    │  Policy Manager           │
                    │       │                   │
                    │       ▼                   │
                    │  AI Gateway               │
                    │       │                   │
                    │   ┌───┴────┐              │
                    │   ▼        ▼              │
                    │ LLM-1     LLM-2           │
                    │                           │
                    └───────────▲───────────────┘
                                │
                         Sanitized data
                                │
════════════════════════════════════════════════
              CUSTOMER SECURITY BOUNDARY
════════════════════════════════════════════════
                                │
                    ┌───────────┴───────────┐
                    │                       │
              ┌─────▼──────┐        ┌──────▼──────┐
              │ Twin Agent  │        │ Local UI    │
              │             │        │             │
              │ Collector   │        │ Graph       │
              │ Normalizer  │        │ Analysis    │
              │ PII Filter  │        │ Migration   │
              └──────┬──────┘        └─────────────┘
                     │
                     ▼
              ┌──────────────┐
              │ Digital Twin │
              │              │
              │ Graph DB     │
              └──────┬───────┘
                     │
                     ▼
                 Jira DC
