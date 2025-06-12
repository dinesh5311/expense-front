import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToastService, ToastMessage } from '../toast';
import { Subscription, timer } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.scss'] // ✅ fixed typo: styleUrl → styleUrls
})
export class ToastComponent implements OnInit {
  toast: ToastMessage | null = null;
  private subscription?: Subscription;

  constructor(
    private toastService: ToastService,
    private cdRef: ChangeDetectorRef // ✅ added
  ) {}

  ngOnInit() {
    this.toastService.toastState$.subscribe((toast: ToastMessage) => {
      // ✅ defer assignment to next change detection cycle
      Promise.resolve().then(() => {
        this.toast = toast;
        this.cdRef.detectChanges();
      });

      timer(3000).subscribe(() => {
        this.toast = null;
        this.cdRef.detectChanges(); // ✅ detect changes after clearing
      });
    });
  }
}
