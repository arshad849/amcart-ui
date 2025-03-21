import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  userInfo: any = null;  // Store user details
  loading: boolean = true;
  error: string | null = null;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.authService.getUserInfo().then(user=>{
      if(user){
        this.authService.getUserFromDb(user.sub).subscribe({
          next :user=>{
          this.userInfo = user;
          this.loading = false;
          this.cdr.detectChanges(); 
          },
          error: (err) => {
            this.error = 'Failed to fetch user details';
            console.error(err);
            this.loading = false;
          }
        });
      }
    })
  }
}
